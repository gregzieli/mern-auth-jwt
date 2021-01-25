import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;