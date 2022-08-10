import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError } from "jsonwebtoken";
import DatabaseError from "../models/errors/database.erro.model";
import ForbiddenError from "../models/errors/forbidden.error.model";
import { TokenExpiredError } from "../models/errors/token-expired.error.model";
import UnauthorizedError from "../models/errors/unauthorized.error.model";

export const erroHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof JsonWebTokenError) {
    res.status(StatusCodes.FORBIDDEN).send({
      message: error.message,
    });
    return;
  }

  if (
    error instanceof TokenExpiredError ||
    error instanceof UnauthorizedError
  ) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: error.message,
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: error.message,
  });
};
