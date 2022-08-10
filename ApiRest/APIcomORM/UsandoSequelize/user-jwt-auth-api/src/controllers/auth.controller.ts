import { NextFunction, Request, RequestHandler, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import DatabaseError from "../models/errors/database.erro.model";
import { RefreshToken } from "../models/refresh-token.model";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  createRefreshToken,
  verifyExpiration,
} from "./refresh-token.controller";

dotenv.config();

export const singup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salt = Number(process.env.CRYPT_SALT);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  let roles = req.body.roles;
  // default role: user
  if (!roles) {
    roles = ["user"];
  }
  // all users have user role
  if (!roles.includes("user")) {
    roles.push("user");
  }

  await User.create({ ...req.body }).then((user) => {
    Role.findAll({ where: { role_name: roles } })
      .then((role) => {
        user.$set("roles", role).then(() => {
          res.status(StatusCodes.CREATED).send({
            message: "User was registered successfully!",
          });
        });
      })
      .catch((error) => {
        next(error);
      });
  });
};

export const singin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  await User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        throw new DatabaseError("User not found");
      }

      const userPassword = user.getDataValue("password");
      const passwordMatches = bcrypt.compareSync(password, userPassword);
      if (!passwordMatches) {
        throw new DatabaseError("Invalid password");
      }

      const uuid = user.getDataValue("uuid");
      const jwtPayload = { username: username };
      const jwtOptions = {
        subject: uuid,
        expiresIn: Number(process.env.JWT_EXPIRATION),
      };
      const secretKey = String(process.env.JWT_SECRET_KEY);
      const token = JWT.sign(jwtPayload, secretKey, jwtOptions);

      createRefreshToken(uuid, req).then((refreshToken) => {
        user.$get("roles").then((roles) => {
          let authorizations: string[] = [];
          roles.forEach((role) => {
            authorizations.push(
              `ROLE_${role.getDataValue("role_name").toUpperCase()}`
            );
          });
          res.status(StatusCodes.OK).send({
            uuid: uuid,
            username: user.getDataValue("username"),
            email: user.getDataValue("email"),
            roles: authorizations,
            accessToken: token,
            refreshToken: refreshToken,
          });
        });
      });
    })
    .catch((error) => {
      next(error);
    });
};

export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken: requestToken } = req.body;
    if (!requestToken) {
      throw new ForbiddenError("Refresh token is required!");
    }

    const refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      throw new ForbiddenError("Refresh token not found!");
    }

    const hasExpired = verifyExpiration(refreshToken);
    if (hasExpired) {
      RefreshToken.destroy({
        where: { token: refreshToken.getDataValue("token") },
      });

      throw new ForbiddenError(
        "Refresh token was expired. Please make a new signin request"
      );
    }

    const uuid = refreshToken.getDataValue("user_uuid");
    const user = await User.findByPk(uuid);
    const jwtPayload = { username: user!.getDataValue("username") };
    const jwtOptions = {
      subject: uuid,
      expiresIn: Number(process.env.JWT_EXPIRATION),
    };
    const secretKey = String(process.env.JWT_SECRET_KEY);
    const newAccessToken = JWT.sign(jwtPayload, secretKey, jwtOptions);
    res.status(StatusCodes.OK).send({
      accessToken: newAccessToken,
      refreshToken: refreshToken.getDataValue("token"),
    });
  } catch (error) {
    next(error);
  }
};
