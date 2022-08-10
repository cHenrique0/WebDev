const { Router } = require("express");
const { getIndex } = require("../controllers/IndexController");

const indexRouter = Router();

indexRouter.get("/", getIndex);

module.exports = indexRouter;
