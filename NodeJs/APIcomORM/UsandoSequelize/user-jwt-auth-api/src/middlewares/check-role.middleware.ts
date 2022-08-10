import { NextFunction, Request, RequestHandler, Response } from "express";
import UnauthorizedError from "../models/errors/unauthorized.error.model";
import { User } from "../models/user.model";

export const isAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const uuid = req.user.getDataValue("uuid");
    await User.findByPk(uuid).then((user) => {
      if (user) {
        user
          .$get("roles")
          .then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].getDataValue("role_name") === "admin") {
                next();
                return;
              }
            }
            throw new UnauthorizedError("Require 'admin' role");
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
};

export const isModerator: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const uuid = req.user.getDataValue("uuid");
    await User.findByPk(uuid).then((user) => {
      if (user) {
        user
          .$get("roles")
          .then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].getDataValue("role_name") === "moderator") {
                next();
                return;
              }
            }
            throw new UnauthorizedError("Require 'moderator' role");
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
};

export const isAdminOrModerator: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const uuid = req.user.getDataValue("uuid");
    await User.findByPk(uuid).then((user) => {
      if (user) {
        user
          .$get("roles")
          .then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].getDataValue("role_name") === "admin") {
                next();
                return;
              }
              if (roles[i].getDataValue("role_name") === "moderator") {
                next();
                return;
              }
            }
            throw new UnauthorizedError("Require 'admin' or 'moderator' role");
          })
          .catch((error) => {
            next(error);
          });
      }
    });
  }
};
