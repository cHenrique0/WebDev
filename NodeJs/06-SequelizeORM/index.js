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

// Show the registration page
app.get("/users/create", (request, response) => {
  return response.status(200).render("add-user");
});

// Insert data in the database
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

// Select: one user
app.get("/users/:uuid", async (request, response) => {
  const { uuid } = request.params;
  const user = await User.findByPk(uuid, { raw: true });
  // const user = await User.findOne({ where: { uuid }, raw: true });
  return response.status(200).render("find-user", { user });
});

app.get("/", async (request, response) => {
  // Select: all users
  // raw: true only returns a list of user objects
  // Test findAll without raw and print it on the console
  const users = await User.findAll({ raw: true });
  return response.status(200).render("home", { users });
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
