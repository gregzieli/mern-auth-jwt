import { verify } from "jsonwebtoken";

export function authorize(req, res, next) {
  const token = req.get("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
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
