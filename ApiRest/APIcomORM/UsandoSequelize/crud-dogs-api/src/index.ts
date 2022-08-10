import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { StatusCodes } from "http-status-codes";
import dogRouter from "./routes/dog.route";
import { connection } from "./database/connection";
import testRouter from "./routes/test.route";

const app = express();
const port = 5000;
const allowedOrigins = [`http://localhost:${port}`];
const opitons: CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(opitons));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(testRouter);
app.use(dogRouter);

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
  console.log(`> ${allowedOrigins}`);
  connection.sync().then(() => {
    console.log("Database synced successfully");
  });
});
