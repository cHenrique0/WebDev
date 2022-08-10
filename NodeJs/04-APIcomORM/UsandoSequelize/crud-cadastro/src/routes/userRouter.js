const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { checkUserExists } = require("../middlewares/UserMiddleware");

const userRouter = Router();

userRouter.post("/users", UserController.create);

userRouter.get("/users", UserController.findAll);

userRouter.get("/users/:uuid", UserController.findByID);

userRouter.patch("/users/:uuid", checkUserExists, UserController.update);

userRouter.delete("/users/:uuid", checkUserExists, UserController.remove);

module.exports = userRouter;
