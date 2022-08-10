import express, { Application, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import connection from "./database/connection";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  async (request: Request, response: Response): Promise<Response> => {
    return response.status(StatusCodes.OK).send({
      message: "Welcome to the cookbook API",
      endpoints: `http://localhost:${port}/api`,
    });
  }
);

try {
  connection
    .sync()
    .then((conn) => {
      console.log(`Database '${conn.getDatabaseName()}' synced successfully`);
      app.listen(port, () => {
        console.log(`Application is runnig at: http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error: any) {
  console.log(`Error ocurred: ${error.message}`);
}
