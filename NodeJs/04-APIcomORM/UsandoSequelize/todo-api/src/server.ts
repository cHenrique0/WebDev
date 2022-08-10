import express from "express";
import database from "./config/database.config";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.routes";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", todoRouter);

database
  .sync()
  .then((conn) => {
    console.log(`Database '${conn.getDatabaseName()}' synced successfully`);
    app.listen(port, () => {
      console.log(`Application is running at port: ${port}`);
      console.log(`Click here: http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
