import { Router } from "express";
import {
  adminAccess,
  allAccess,
  moderatorAccess,
  userAccess,
} from "../controllers/user.controller";
import { isAdmin, isModerator } from "../middlewares/check-role.middleware";
import { jwtAuthMiddleware } from "../middlewares/jwt-auth.middleware";

const userRouter = Router();

userRouter.get("/api/test/all", allAccess);

userRouter.get("/api/test/admin", [jwtAuthMiddleware, isAdmin], adminAccess);

userRouter.get(
  "/api/test/mod",
  [jwtAuthMiddleware, isModerator],
  moderatorAccess
);

userRouter.get("/api/test/user", [jwtAuthMiddleware], userAccess);

export default userRouter;
