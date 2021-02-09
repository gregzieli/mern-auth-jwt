import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

import RefreshToken from "../models/refresh-token.model.js";

function generateAccessToken({ id }) {
  // sub (subject) is a registered payload claim
  return jwt.sign({ sub: id }, process.env.SECRET, { expiresIn: "15m" });
}

function generateRefreshToken({ id }) {
  // 7 days expiration date
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return new RefreshToken({
    user: id,
    token: randomBytes(40).toString("hex"),
    expires: expirationDate,
  });
}

export default { generateAccessToken, generateRefreshToken };
