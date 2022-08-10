import { NextFunction, Request, Response, Router } from "express";
import {
  fileDownload,
  fileUpload,
  getFiles,
} from "../controllers/file.controller";
import path from "path";

const fileRouter = Router();

fileRouter.post("/api/upload", fileUpload);

fileRouter.get("/api/files", getFiles);

fileRouter.get("/api/files/:name", fileDownload);

export default fileRouter;
