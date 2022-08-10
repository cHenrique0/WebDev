import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { Todo } from "../models/todo.model";

export class TodoController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    await Todo.create({ ...request.body })
      .then((todo) => {
        if (!todo) {
          return response.status(StatusCodes.BAD_REQUEST).send({
            message: "Unable create TODO",
          });
        }
        return response.status(StatusCodes.CREATED).send(todo);
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  public async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { title } = request.query;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : undefined;
    await Todo.findAll({ where: condition })
      .then((todos) => {
        return response.status(StatusCodes.OK).send(todos);
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  public async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const todoID = request.params.uuid;
    await Todo.findByPk(todoID)
      .then((todo) => {
        if (!todo) {
          return response.status(StatusCodes.NOT_FOUND).send({
            message: "TODO not found",
          });
        }
        return response.status(StatusCodes.OK).send(todo);
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  public async findCompleted(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    await Todo.findAll({ where: { completed: true } })
      .then((todo) => {
        return response.status(StatusCodes.OK).send(todo);
      })
      .catch((error) => {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  public async findNotCompleted(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    await Todo.findAll({ where: { completed: false } })
      .then((todo) => {
        return response.status(StatusCodes.OK).send(todo);
      })
      .catch((error) => {
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const todoID = request.params.uuid;

    await Todo.update({ ...request.body }, { where: { uuid: todoID } }).then(
      ([affectedCount]) => {
        if (!affectedCount) {
          return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return response.status(StatusCodes.OK).send({
          message: "TODO has been updated successfully",
        });
      }
    );
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const todoID = request.params.uuid;
    await Todo.destroy({ where: { uuid: todoID } })
      .then((deleted) => {
        if (!deleted) {
          return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Unable delete TODO",
          });
        }
        return response.status(StatusCodes.OK).send({
          message: "TODO has been deleted successsfully",
        });
      })
      .catch((error) => {
        console.log(error);
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      });
  }
}
