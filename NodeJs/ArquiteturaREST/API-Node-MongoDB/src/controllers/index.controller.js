const { StatusCodes } = require("http-status-codes");

class IndexController {
  getIndex(request, response, next) {
    return response.status(StatusCodes.OK).send({
      message: "Welcome to API with Node.js & MongoDB",
    });
  }
}

module.exports = IndexController;
