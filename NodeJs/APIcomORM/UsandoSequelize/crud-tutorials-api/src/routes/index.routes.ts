import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const indexRouter: Router = Router();

indexRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction): void => {
    return res.redirect(StatusCodes.PERMANENT_REDIRECT, "/api");
  }
);

indexRouter.get(
  "/api",
  (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(StatusCodes.OK).send({
      message: "CRUD API example",
    });
  }
);

export default indexRouter;
