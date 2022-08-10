const { Router } = require("express");
const PersonController = require("../controllers/person.controller");

const personRouter = Router();
const personController = new PersonController();

personRouter.post("/person", personController.create);

personRouter.get("/person", personController.findAll);

personRouter.get("/person/:id", personController.findById);

personRouter.patch("/person/:id", personController.update);

personRouter.delete("/person/:id", personController.delete);

module.exports = personRouter;
