import { Router } from "express";
import {
  createTutorial,
  findAllTutorials,
  findTutorialByID,
  updateTutorial,
  deleteTutorial,
  deleteAllTutorials,
  findAllPublished,
} from "../controllers/tutorial.controller";

const tutorialRouter: Router = Router();

tutorialRouter.post("/api/tutorials", createTutorial);

tutorialRouter.get("/api/tutorials", findAllTutorials);

tutorialRouter.get("/api/tutorials/published", findAllPublished);

tutorialRouter.get("/api/tutorials/:uuid", findTutorialByID);

tutorialRouter.put("/api/tutorials/:uuid", updateTutorial);

tutorialRouter.delete("/api/tutorials/:uuid", deleteTutorial);

tutorialRouter.delete("/api/tutorials", deleteAllTutorials);

export default tutorialRouter;
