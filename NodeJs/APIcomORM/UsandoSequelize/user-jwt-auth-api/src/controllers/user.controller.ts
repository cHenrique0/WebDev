import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const allAccess: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.status(StatusCodes.OK).send({
    message: "Public content",
  });
};

export const adminAccess: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.status(StatusCodes.OK).send({
    message: "Admin content",
  });
};

export const moderatorAccess: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.status(StatusCodes.OK).send({
    message: "Moderator content",
  });
};

export const userAccess: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.status(StatusCodes.OK).send({
    message: "User content",
  });
};
