import { Router } from "express";
import {
  createDog,
  deleteDog,
  findAllDogs,
  findDogById,
  updateDog,
} from "../controllers/dog.controller";

const dogRouter = Router();

dogRouter.post("/dogs", createDog);

dogRouter.get("/dogs", findAllDogs);

dogRouter.get("/dogs/:uuid", findDogById);

dogRouter.put("/dogs/:uuid", updateDog);

dogRouter.delete("/dogs/:uuid", deleteDog);

export default dogRouter;
