export default function handler(req, res) {
    const { method, query } = req;

    try {
        switch (method) {
            case "GET":
                // Operación de lectura
                return res.status(200).json({
                    message: "user get",
                });

            case "POST":
                // Operación de creación
                return res.status(201).json({
                    message: "user post",
                });

            case "PUT":
                // Operación de actualización
                return res.status(200).json({
                    message: "user put",
                });

            case "DELETE":
                // Operación de eliminación
                return res.status(204).json({
                    message: "user delete",
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
