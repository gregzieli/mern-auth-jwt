import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

import RefreshToken from "../models/refresh-token.model.js";

function generateAccessToken({ id }) {
  // TODO: why sub & id?
  return jwt.sign({ sub: id, id: id }, process.env.SECRET, { expiresIn: "15m" });
}

function generateRefreshToken({ id }) {
  // create a refresh token that expires in 7 days
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return new RefreshToken({
    user: id,
    token: randomBytes(40).toString("hex"),
    expires: expirationDate,
  });
}

export default { generateAccessToken, generateRefreshToken };
