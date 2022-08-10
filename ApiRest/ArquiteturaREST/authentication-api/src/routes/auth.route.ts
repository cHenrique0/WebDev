import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAuthMiddleware from "../middlewares/basic.auth.middleware";
import jwtAuthMiddleware from "../middlewares/jwt-auth.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authRoute = Router();

authRoute.post(
  "/token",
  basicAuthMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.user;
      if (!user) {
        throw new ForbiddenError("Usuário não informado!");
      }
      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = <string>process.env.JWT_SECRET_KEY;
      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
      response.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

authRoute.post(
  "/token/validate",
  jwtAuthMiddleware,
  (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(StatusCodes.OK);
  }
);

export default authRoute;
