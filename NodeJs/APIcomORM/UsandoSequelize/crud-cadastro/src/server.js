require("dotenv").config();
const dbConnection = require("./database/index");
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const port = process.env.APP_PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRouter);
app.use("/api", userRouter);

dbConnection
  .sync()
  .then((conn) => {
    console.log(`Database '${conn.getDatabaseName()}' synced successfully`);
    app.listen(port, () => {
      console.log(`Application is running at: http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
