import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import TodoValidator from "../middlewares/todo.middleware";

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.post("/todo", TodoValidator.checkCreateTodo, todoController.create);

todoRouter.get("/todo", todoController.findAll);

todoRouter.get("/todo/completed", todoController.findCompleted);

todoRouter.get("/todo/not-completed", todoController.findNotCompleted);

todoRouter.get("/todo/:uuid", todoController.findById);

todoRouter.patch(
  "/todo/:uuid",
  [TodoValidator.checkTodoExists, TodoValidator.checkCreateTodo],
  todoController.update
);

todoRouter.delete(
  "/todo/:uuid",
  TodoValidator.checkTodoExists,
  todoController.delete
);

export default todoRouter;
