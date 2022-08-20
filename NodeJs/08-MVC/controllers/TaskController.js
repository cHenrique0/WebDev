class TaskController {
  static createTask(request, response) {
    response.render("tasks/create");
  }
}

module.exports = new TaskController();
