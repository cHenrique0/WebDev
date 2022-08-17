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
  .sync()
  .then((conn) => {
    console.log(`* Database '${conn.getDatabaseName()}' synced successfully`);
    app.listen(port, () => {
      console.log(`* Application is running at port: ${port}`);
      console.log(`* Click here to open homepage: http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log(err));
