const Task = require("../models/Task");

module.exports = class TaskController {
  // show all tasks
  static async getTasks(request, response) {
    const taksList = await Task.findAll({ raw: true });
    return response.status(200).render("tasks/list", { taksList });
  }

  // task create page
  static viewTaskCreate(request, response) {
    return response.status(200).render("tasks/create");
  }
};
