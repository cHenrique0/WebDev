const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

module.exports = class TaskController {
  // show all tasks
  static async getTasks(request, response) {
    let { title, done } = request.query;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : undefined;
    let notice = "";

    // prepare condition to filter done task
    if (done === "1") {
      condition = { done: true };
      notice = "You haven't done any tasks yet";
    }
    // prepare condition to filter not done task
    if (done === "0") {
      condition = { done: false };
      notice = "You have done all tasks";
    }

    const taskList = await Task.findAll({
      where: condition,
      raw: true,
      order: ["title"],
    });

    return response
      .status(StatusCodes.OK)
      .render("tasks/list", { taskList, title, done, notice });
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

  // task update page
  static async updateTaskView(request, response) {
    const { uuid } = request.params;
    const task = await Task.findByPk(uuid, { raw: true });
    return response.status(StatusCodes.OK).render("tasks/edit", { task });
  }

  // update a task
  static async updateTask(request, response) {
    const { uuid } = request.params;
    const { title, description } = request.body;
    const updatedTask = { title, description };

    await Task.update({ ...updatedTask }, { where: { uuid } });

    return response.status(StatusCodes.OK).redirect("/tasks/list");
  }

  // done task
  static async doneTask(request, response) {
    const { uuid } = request.params;

    const { done } = await Task.findByPk(uuid, { raw: true });

    const doneTask = {
      done: !!done ? false : true,
    };

    await Task.update({ ...doneTask }, { where: { uuid } });

    return response.status(StatusCodes.OK).redirect("/tasks/list");
  }
};
