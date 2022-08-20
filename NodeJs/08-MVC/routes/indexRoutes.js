const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (request, response) => {
  return response.status(200).render("home");
});

module.exports = indexRouter;
