import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }

    const [authType, token] = authHeader.split(" ");
    if (authType !== "Basic" || !token) {
      throw new ForbiddenError("Tipo de autenticação ou token inválido");
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = tokenContent.split(":");
    if (!username || !password) {
      throw new ForbiddenError("Credenciais não preenchidas");
    }

    const user = await userRepository.findByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new ForbiddenError("Usuário ou senha inválidos!");
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default basicAuthMiddleware;
