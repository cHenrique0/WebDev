// importando Router para definir novas rotas e alguns tipos do express
import { Router, Request, Response, NextFunction } from "express";
// importando constantes do status code
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

// Opcional: criar minha propria constante com o status code
// const OK = StatusCodes.OK;

const usersRoute = Router();

// GET all users
usersRoute.get(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    response.status(StatusCodes.OK).send(users);
  }
);

// GET user by ID
usersRoute.get(
  "/users/:uuid",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // pegando o id digitado na url do navegador
      const uuid = request.params.uuid;
      const user = await userRepository.findUserById(uuid);
      response.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

// POST user(create)
usersRoute.post(
  "/users",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUserUuid = await userRepository.create(request.body);
    response.status(StatusCodes.CREATED).send(newUserUuid);
  }
);

// PUT user(update)
usersRoute.put(
  "/users/:uuid",
  async (request: Request, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const user = request.body;
    user.uuid = uuid;
    await userRepository.update(user);
    response.sendStatus(StatusCodes.OK);
  }
);

// DELETE user
usersRoute.delete(
  "/users/:uuid",
  async (request: Request, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    await userRepository.remove(uuid);
    response.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
