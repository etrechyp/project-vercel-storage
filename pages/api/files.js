import { put, del } from "@vercel/blob";
import multer from "multer";
import sharp from "sharp";

const upload = multer();

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveToBlob = async (file) => {
    const { url } = await put(file.originalname, file.buffer, {
        access: "public",
    });
    return url;
};

const removeFromBlob = async (url) => {
    const resp = await del(url);
    return resp;
};

export default async function handler(req, res) {
    const { method, query } = req;

    try {
        switch (method) {
            case "POST":
                upload.single("file")(req, res, async (err) => {
                    if (err) {
                        console.error("Multer error:", err);
                        return res.status(400).json({
                            message: "Error uploading file",
                            error: err.message,
                        });
                    }

                    const file = req.file;

                    const webpBuffer = await sharp(file.buffer)
                        .webp()
                        .toBuffer();
                    const webpFile = {
                        originalname: `${file.originalname.split(".")[0]}.webp`,
                        buffer: webpBuffer,
                    };

                    const resp = await saveToBlob(webpFile);

                    return res.status(201).json({
                        message: "file created successfully",
                        file: resp,
                    });
                });
                return;

            case "DELETE":
                const respDelete = await removeFromBlob(query.url);
                return res.status(204).json({
                    message: "file deleted successfully",
                    data: respDelete,
                });

            default:
                return res.status(405).json({
                    message: "Method Not Allowed",
                });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
