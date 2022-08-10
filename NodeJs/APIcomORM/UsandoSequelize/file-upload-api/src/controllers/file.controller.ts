import { NextFunction, Request, RequestHandler, Response } from "express";
import uploadFileMiddleware from "../middlewares/file-upload.middleware";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import { baseUrl, __basedir } from "../index";

export const fileUpload: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await uploadFileMiddleware(req, res);
    const file = req.file;

    if (file === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Please, choose a file!",
      });
    }
    res
      .status(StatusCodes.OK)
      .send(`Uploaded the file successfully: ${file.originalname}`);
  } catch (error: any) {
    if (error.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    if (req.file) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: `: ${req.file.originalname}`,
      });
    }
  }
};

export const getFiles: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dirPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(dirPath, (error, files) => {
    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos: object[] = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: `${baseUrl}/files/${file}`,
      });
    });
    res.status(StatusCodes.OK).send(fileInfos);
  });
};

export const fileDownload: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dirPath = __basedir + "/resources/static/assets/uploads/";
  const fileName = req.params.name;
  res.download(dirPath + fileName, fileName, (error) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: `Couldn't download the file: ${error}`,
      });
    }
  });
};
