import { Router } from "express";
import { refreshToken, singin, singup } from "../controllers/auth.controller";
import {
  checkRolesExisted,
  checkUsernameOrEmailExisted,
} from "../middlewares/verify-singup.middleware";

const authRouter = Router();

authRouter.post(
  "/api/auth/singup",
  [checkUsernameOrEmailExisted, checkRolesExisted],
  singup
);

authRouter.post("/api/auth/singin", singin);

authRouter.post("/api/auth/refreshtoken", refreshToken);

export default authRouter;
