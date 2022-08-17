const express = require("express");
const { engine } = require("express-handlebars");
const connection = require("./database/connection");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (request, response) => {
  return response.status(200).render("home");
});

// Database connection
connection
  .authenticate()
  .then(() => {
    console.log(`> Database connected successfully`);
    app.listen(port, () => {
      console.log(`> Application is runnig at: http://localhost:3000/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
