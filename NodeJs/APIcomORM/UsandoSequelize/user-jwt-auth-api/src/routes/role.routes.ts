import { Router } from "express";
import {
  createRole,
  deleteRole,
  findRoleByID,
  findRoles,
  updateRole,
} from "../controllers/role.controller";
import { isAdmin } from "../middlewares/check-role.middleware";
import { jwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

const roleRouter = Router();

roleRouter.post("/api/roles", [jwtAuthMiddleware, isAdmin], createRole);

roleRouter.get("/api/roles", [jwtAuthMiddleware, isAdmin], findRoles);

roleRouter.get("/api/roles/:uuid", [jwtAuthMiddleware, isAdmin], findRoleByID);

roleRouter.delete("/api/roles/:uuid", [jwtAuthMiddleware, isAdmin], deleteRole);

roleRouter.put("/api/roles/:uuid", [jwtAuthMiddleware, isAdmin], updateRole);

export default roleRouter;
