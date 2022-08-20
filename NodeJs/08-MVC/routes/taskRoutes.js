const { Router } = require("express");
const TaskController = require("../controllers/TaskController");
const taskRouter = Router();

taskRouter.get("/list", TaskController.getTasks);

taskRouter.get("/create", TaskController.viewTaskCreate);

module.exports = taskRouter;
