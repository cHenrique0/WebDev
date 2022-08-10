import { NextFunction, Request, Response, Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.redirect("/api");
});

indexRouter.get("/api", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ message: "File upload example" });
});

export default indexRouter;
