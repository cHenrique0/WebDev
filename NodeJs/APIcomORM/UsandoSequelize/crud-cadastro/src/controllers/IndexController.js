const { StatusCodes } = require("http-status-codes");

const getIndex = (request, response) => {
  return response.status(StatusCodes.OK).send({
    message: "CRUD API for user registration",
  });
};

module.exports = { getIndex };
