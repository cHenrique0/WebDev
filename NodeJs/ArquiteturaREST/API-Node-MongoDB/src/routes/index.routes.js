const { Router } = require("express");
const IndexController = require("../controllers/index.controller");

const indexRouter = Router();
const indexController = new IndexController();

indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;
