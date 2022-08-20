const express = require("express");
const { engine } = require("express-handlebars");
const connectionDB = require("./database/connection");

const app = express();
const port = process.env.APP_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

connectionDB.sync().then((conn) => {
  console.log(`* [${conn.getDatabaseName()}] database synced successfully`);
  app.listen(port, () => {
    console.log(`* Application is runnnig at port: ${port}`);
    console.log(`* Click here to start using it: http://localhost:${port}/`);
  });
});
