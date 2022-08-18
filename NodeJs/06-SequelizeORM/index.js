const express = require("express");
const { engine } = require("express-handlebars");
const connection = require("./database/connection");
const User = require("./models/User");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/users/create", (request, response) => {
  return response.status(200).render("add-user");
});

app.post("/users/create", async (request, response) => {
  const { name, occupation } = request.body;
  const newsletter = request.body.newsletter === "on" ? true : false;

  const newUser = {
    name,
    occupation,
    newsletter,
  };

  await User.create({ name, occupation, newsletter });

  return response.status(201).redirect("/");
});

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
