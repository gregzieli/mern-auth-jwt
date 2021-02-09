import jwt from "jsonwebtoken";

export function authorize(req, res, next) {
    try {
        const header = req.get("Authorization");

        if (!header) {
            return res.status(401).json({ error: "Missing authorization header" });
        }

        const [schema, token] = header.split(" ");

        if (!/^Bearer$/i.test(schema) || !token) {
            return res.status(401).json({ error: "Incorrect authorization format" });
        }

        const payload = jwt.verify(token, process.env.SECRET);
        req.user = { id: payload.sub };
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired" });
        }
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
