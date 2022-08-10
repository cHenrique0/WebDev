import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.erro.model";
import ForbiddenError from "../models/errors/forbidden.error.model";

function erroHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof DatabaseError) {
    response.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }

  if (error instanceof ForbiddenError) {
    response.sendStatus(StatusCodes.FORBIDDEN);
    return;
  }

  response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}

export default erroHandler;
