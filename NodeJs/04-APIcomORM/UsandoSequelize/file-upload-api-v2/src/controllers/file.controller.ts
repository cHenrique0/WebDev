import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { baseUrl } from "../server";

export default class FileController {
  public uploadView(request: Request, response: Response, next: NextFunction) {
    const file = path.resolve("src/views/index.html");
    return response.status(StatusCodes.OK).sendFile(file);
  }

  public async upload(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const file = request.file;

      if (file === undefined) {
        return response.status(StatusCodes.BAD_REQUEST).send({
          message: "Please, choose a file!",
        });
      }

      return response.status(StatusCodes.OK).send({
        message: "Uploaded the file successfully",
        file: file.filename,
      });
    } catch (error: any) {
      if (error.code == "LIMIT_FILE_SIZE") {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "File size cannot be larger than 5MB!",
        });
      }
    }
  }

  public async getFiles(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.resolve("src/resources/static/uploads/files");

    fs.readdir(dirPath, (error, files) => {
      if (error) {
        console.log(error);

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
  }

  public async getImages(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.resolve("src/resources/static/uploads/images");

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
          url: `${baseUrl}/images/${file}`,
        });
      });
      res.status(StatusCodes.OK).send(fileInfos);
    });
  }

  public async downloadFile(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.resolve("src/resources/static/uploads/files/");
    const fileName = req.params.name;
    const url = `${dirPath}/${fileName}`;

    res.download(url, fileName, (error) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Couldn't download the file",
          error: error,
        });
      }
    });
  }

  public async downloadImage(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.resolve("src/resources/static/uploads/images/");
    const fileName = req.params.name;
    const url = `${dirPath}/${fileName}`;

    res.download(url, fileName, (error) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Couldn't download the file",
          error: error,
        });
      }
    });
  }
}
