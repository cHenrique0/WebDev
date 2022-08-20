const Task = require("../models/Task");

module.exports = class TaskController {
  // show all tasks
  static async getTasks(request, response) {
    const taksList = await Task.findAll({ raw: true });
    return response.status(200).render("tasks/list", { taksList });
  }

  // task create page
  static createTaskView(request, response) {
    return response.status(200).render("tasks/create");
  }

  // create a task
  static async createTask(request, response) {
    const { title, description } = request.body;
    const done = false;
    const newTask = { title, description, done };

    await Task.create(newTask).catch((error) => console.log(error));

    return response.status(201).redirect("/tasks/list");
  }
};
