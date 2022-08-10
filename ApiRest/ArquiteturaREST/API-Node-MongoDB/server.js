const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const indexRouter = require("./src/routes/index.routes");
const personRouter = require("./src/routes/person.routes");

dotenv.config();

const app = express();
const port = 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.duyfvif.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRouter);
app.use("/api", personRouter);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database successfully connected");

    app.listen(port, () => {
      console.log(`Application is running at: http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
