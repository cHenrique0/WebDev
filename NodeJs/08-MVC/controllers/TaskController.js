const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

module.exports = class TaskController {
  // show all tasks
  static async getTasks(request, response) {
    const taskList = await Task.findAll({ raw: true });
    return response.status(StatusCodes.OK).render("tasks/list", { taskList });
  }

  // task create page
  static createTaskView(request, response) {
    return response.status(StatusCodes.OK).render("tasks/create");
  }

  // create a task
  static async createTask(request, response) {
    const { title, description } = request.body;
    const done = false;
    const newTask = { title, description, done };

    await Task.create(newTask).catch((error) => console.log(error));

    return response.status(StatusCodes.CREATED).redirect("/tasks/list");
  }

  // delete a task
  static async deleteTask(request, response) {
    const { uuid } = request.params;

    await Task.destroy({ where: { uuid } });

    return response.status(StatusCodes.OK).redirect("/tasks/list");
  }
};
