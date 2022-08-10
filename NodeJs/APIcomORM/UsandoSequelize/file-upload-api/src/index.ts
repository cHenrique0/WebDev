import express from "express";
import cors from "cors";
import fileUploadRouter from "./routes/file-upload.routes";
import indexRouter from "./routes/index.routes";

export const __basedir = __dirname;

const app = express();
const PORT = 4000 || 8080;
export const baseUrl = `http://localhost:${PORT}/api`;
const corsOptions = {
  origin: baseUrl,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);
app.use(fileUploadRouter);

app.listen(PORT, () => {
  console.log(`Application is running at: ${baseUrl}`);
});
