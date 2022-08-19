const express = require("express");
const { engine } = require("express-handlebars");
const connection = require("./database/connection");
const associations = require("./models/associations");
const Address = require("./models/Address");
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
  const { street, number, city, state } = request.body;

  const newUser = { name, occupation, newsletter };

  await User.create({ ...newUser }).then((user) => {
    const newAddress = { street, number, city, state, user_uuid: user.uuid };
    Address.create({ ...newAddress });
  });

  return response.status(201).redirect("/");
});

// Select: one user
app.get("/users/:uuid", async (request, response) => {
  const { uuid } = request.params;
  const user = await User.findByPk(uuid, { raw: true });
  // const user = await User.findOne({ where: { uuid }, raw: true });
  return response.status(200).render("find-user", { user });
});

// Delete user
app.post("/users/delete/:uuid", async (request, response) => {
  const { uuid } = request.params;
  const deletedUser = await User.destroy({ where: { uuid } });
  if (deletedUser > 0) {
    return response.status(200).redirect("/");
  }
});

// Update user - view
app.get("/users/edit/:uuid", async (request, response) => {
  try {
    const { uuid } = request.params;
    const user = await User.findByPk(uuid, { include: Address });
    let hasAddress = user.Addresses.length > 0 ? true : false;

    return response
      .status(200)
      .render("edit-user", { user: user.get({ plain: true }), hasAddress });
  } catch (error) {
    console.log(error);
  }
});

// Update user - updating data
app.post("/users/update", async (request, response) => {
  const { uuid, name, occupation } = request.body;
  const newsletter = request.body.newsletter === "on" ? true : false;
  const updatedUser = {
    name,
    occupation,
    newsletter,
  };

  await User.update({ ...updatedUser }, { where: { uuid } });

  return response.status(200).redirect("/");
});

// Create address
app.post("/address/create", async (request, response) => {
  const { street, number, city, state, user_uuid } = request.body;
  const newAddress = {
    street,
    number,
    city,
    state,
    user_uuid,
  };

  await Address.create({ ...newAddress });

  return response.status(201).redirect(`/users/edit/${user_uuid}`);
});

// Delete address
app.post("/address/delete/:uuid", async (request, response) => {
  const { uuid } = request.params;
  const { user_uuid } = request.body;
  const deletedAddress = await Address.destroy({ where: { uuid } });
  if (deletedAddress > 0) {
    return response.status(200).redirect(`/users/edit/${user_uuid}`);
  }
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
