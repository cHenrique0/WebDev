import { NextFunction, Request, RequestHandler, Response } from "express";
import { TokenExpiredError } from "../models/errors/token-expired.error.model";
import JWT, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const jwtAuthMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new JsonWebTokenError("No token provided!");
    }

    const [authType, token] = authHeader.split(" ");
    if (authType !== "Bearer") {
      throw new JsonWebTokenError("Invalid authentication type!");
    }

    try {
      const tokenPayload = JWT.verify(
        token,
        <string>process.env.JWT_SECRET_KEY
      );
      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new JsonWebTokenError("Invalid token!");
      }

      const user = await User.findOne({
        where: {
          uuid: tokenPayload.sub,
          username: tokenPayload.username,
        },
      });
      if (user) {
        req.user = user;
      }
      next();
    } catch (error) {
      throw new TokenExpiredError("Unauthorized! Access Token was expired!");
    }
  } catch (error) {
    next(error);
  }
};
