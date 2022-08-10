import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const indexRouter = Router();

indexRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction): void => {
    return res.redirect(StatusCodes.PERMANENT_REDIRECT, "/api");
  }
);

indexRouter.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).send({
    message: "JWT user authentication API example",
  });
});

export default indexRouter;
