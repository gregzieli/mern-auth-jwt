import express, { json, urlencoded } from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/error-handler.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// TODO: it's not really used
app.use(errorHandler);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

export default app;
