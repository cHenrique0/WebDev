const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const indexRouter = Router();

indexRouter.get("/", (request, response) => {
  return response.status(StatusCodes.OK).render("home");
});

module.exports = indexRouter;
