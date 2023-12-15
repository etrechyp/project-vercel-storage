import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const saveToBlob = async (file) => {
    const form = await request.formData();
    const file = form.get("file");
    const blob = await put(file.name, file, { access: "public" });

    return NextResponse.json(blob);
};

const getToBlob = async () => {
    console.log("get to blob");
};

const deleteToBlob = async () => {
    console.log("deleted to blob");
};

export default async function handler(req, res) {
    const { method, query } = req;

    try {
        switch (method) {
            case "GET":
                await getToBlob();
                return res.status(200).json({
                    message: "file",
                });

            case "POST":
                console.log(res.body);
                await saveToBlob();
                return res.status(201).json({
                    message: "file created succsessfuly",
                });

            case "DELETE":
                await deleteToBlob();
                return res.status(204).json({
                    message: "file deleted successfuly",
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
