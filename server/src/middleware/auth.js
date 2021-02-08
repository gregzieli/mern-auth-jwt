import jwt from "jsonwebtoken";

export function authorize(req, res, next) {
    // TODO: more universal is bearer:... ?
    const token = req.get("x-auth-token");

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.user = payload.user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Session expired" });
        }
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
