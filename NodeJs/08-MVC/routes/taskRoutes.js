const { Router } = require("express");
const TaskController = require("../controllers/TaskController");
const taskRouter = Router();

taskRouter.get("/list", TaskController.getTasks);

taskRouter.get("/create", TaskController.createTaskView);

taskRouter.post("/create", TaskController.createTask);

taskRouter.post("/delete/:uuid", TaskController.deleteTask);

module.exports = taskRouter;
