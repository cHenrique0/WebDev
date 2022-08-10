import { Router } from "express";
import IndexController from "../controllers/index.controller";

const indexRouter = Router();
const indexController = new IndexController();

indexRouter.get("/", indexController.getIndex);

export default indexRouter;
