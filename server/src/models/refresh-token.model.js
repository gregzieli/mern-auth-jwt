import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  token: { type: String },
});

export default model("Token", tokenSchema);
