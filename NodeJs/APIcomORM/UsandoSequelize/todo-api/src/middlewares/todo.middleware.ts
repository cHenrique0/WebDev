import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Todo } from "../models/todo.model";

class TodoValidator {
  public async checkCreateTodo(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { title } = request.body;
    if (!title) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        message: "The 'title' should not be empty",
      });
    }
    next();
  }

  public async checkTodoExists(
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
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  }
}

export default new TodoValidator();
