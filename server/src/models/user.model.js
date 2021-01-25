import { Schema, model } from "mongoose";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import Token from "./refresh-token.model";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods = {
  createAccessToken: async function () {
    try {
      const { _id, name } = this;
      const accessToken = sign({ user: { _id, name } }, ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      });
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      const { _id, name } = this;
      const refreshToken = sign({ user: { _id, name } }, REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      await Token.create({ token: refreshToken });
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hash(this.password, 12);
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});

export default model("User", userSchema);
