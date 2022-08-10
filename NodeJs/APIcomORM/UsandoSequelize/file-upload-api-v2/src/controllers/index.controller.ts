import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { baseUrl } from "../server";

export default class IndexController {
  public async getIndex(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> {
    return response.status(StatusCodes.OK).send({
      message: "API for uploading and downloading files",
      routes: {
        upload: `${baseUrl}/upload`,
        getFiles: `${baseUrl}/files`,
        getImages: `${baseUrl}/images`,
        downloadFile: `${baseUrl}/files/[filename]`,
        downloadImage: `${baseUrl}/images/[image name]`,
        getUploads: `${baseUrl}/uploads/[images or files]/[image or filename]`,
      },
    });
  }
}
