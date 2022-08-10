import { NextFunction, Request, RequestHandler, Response } from "express";
import DatabaseError from "../models/errors/database.erro.model";
import ForbiddenError from "../models/errors/forbidden.error.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

export const checkUsernameOrEmailExisted: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ForbiddenError("Username, Email or Password can't be null!");
    }

    await User.findOne({ where: { username } }).then((user) => {
      if (user) {
        throw new DatabaseError("Username is already in use!");
      }
    });
    await User.findOne({ where: { email } }).then((user) => {
      if (user) {
        throw new DatabaseError("Email is already in use!");
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};

export const checkRolesExisted: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles = req.body.roles;
  const query = await Role.findAll();
  const existingRoles: string[] = [];
  query.forEach((role: Role) => {
    existingRoles.push(role.getDataValue("role_name"));
  });

  try {
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (!existingRoles.includes(roles[i])) {
          throw new DatabaseError(`Failed! '${roles[i]}' role doesn't exist`);
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
