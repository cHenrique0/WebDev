import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import indexRouter from "./routes/index.route";
import fileRouter from "./routes/file.routes";

dotenv.config();

const app = express();
const port = Number(process.env.APP_PORT) || 8080;
export const baseUrl = `http://localhost:${port}/api`;
const corsOptions = {
  origin: baseUrl,
  optionsSuccessStatus: StatusCodes.OK,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);
app.use("/api", fileRouter);

app.listen(port, () => {
  console.log(`Application is running at: ${baseUrl}`);
});
