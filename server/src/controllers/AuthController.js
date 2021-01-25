import User from "../models/user.model";
import Token from "../models/token.model";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password too short" });
  }

  try {
    const hasUser = await User.findOne({ email });

    if (hasUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.create(req.body);
    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function generateRefreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied" });
    }

    const dbToken = await Token.findOne({ token: refreshToken });

    if (!dbToken) {
      return res.status(401).json({ error: "Token expired" });
    }

    const payload = jwt.verify(dbToken.token, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });

    return res.status(200).json({ success: "Successful logout" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
