import express, { Router } from "express";
import path from "path";
import FileController from "../controllers/file.controller";
import uploadFileMiddleware from "../middlewares/file.upload.middleware";

const fileRouter = Router();
const fileController = new FileController();

fileRouter.use(
  "/uploads",
  express.static(path.resolve("src/resources/static/uploads/"))
);

fileRouter.post("/upload", uploadFileMiddleware, fileController.upload);

fileRouter.get("/upload", fileController.uploadView);

fileRouter.get("/files", fileController.getFiles);

fileRouter.get("/images", fileController.getImages);

fileRouter.get("/files/:name", fileController.downloadFile);

fileRouter.get("/images/:name", fileController.downloadImage);

export default fileRouter;
