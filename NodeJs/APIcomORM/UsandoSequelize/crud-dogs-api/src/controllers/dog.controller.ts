import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { Dog } from "../models/dog.model";

export const createDog: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newDog = await Dog.create({ ...req.body });
  const uuid = newDog.getDataValue("uuid");
  res.status(StatusCodes.CREATED).send({
    message: `Dog created successfully!`,
    uuid: uuid,
  });
};

export const findAllDogs: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.query;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : undefined;

  const dogs = await Dog.findAll({ where: condition });
  res.status(StatusCodes.OK).send(dogs);
};

export const findDogById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.params.uuid;
  const dog = await Dog.findByPk(uuid);
  res.status(StatusCodes.OK).send(dog);
};

export const updateDog: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.params.uuid;
  await Dog.update({ ...req.body }, { where: { uuid } });
  res.sendStatus(StatusCodes.OK);
};

export const deleteDog: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.params.uuid;
  await Dog.destroy({ where: { uuid } });
  res.sendStatus(StatusCodes.OK);
};
