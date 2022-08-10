import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Role } from "../models/role.model";

export const createRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleName: string = req.body.role_name;

    await Role.findAll({ where: { role_name: roleName } }).then(
      ([existingRole]) => {
        if (existingRole) {
          let existingRoleName: string = existingRole.getDataValue("role_name");
          if (roleName === existingRoleName) {
            res.status(StatusCodes.BAD_REQUEST).send({
              message: "Role already exists!",
            });
            return;
          }
        }
        Role.create({ role_name: roleName }).then((newRole) => {
          res.status(StatusCodes.CREATED).send({
            uuid: newRole.get("uuid"),
            role_name: newRole.get("role_name"),
          });
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const findRoles: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await Role.findAll();
    res.status(StatusCodes.OK).send(roles);
  } catch (error) {
    next(error);
  }
};

export const findRoleByID: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = req.params.uuid;
    const role = await Role.findByPk(uuid);
    res.status(StatusCodes.OK).send(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = req.params.uuid;
    await Role.update({ ...req.body }, { where: { uuid } });
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = req.params.uuid;
    await Role.destroy({ where: { uuid } });
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
