import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const testRouter = Router();

testRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(StatusCodes.OK).send({
      message: "API example using Sequelize ORM",
    });
  }
);

export default testRouter;
