const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (request, response) => {
  // mock data
  const user = {
    name: "Claudio",
    surname: "Henrique",
  };

  // mock auth
  const auth = true; // switch between true and false to check the behavior

  return response.status(200).render("home", { user, auth }); // sending data to view
});

app.get("/dashboard", (request, response) => {
  const approved = false; // switch between true and false to check the behavior
  return response.status(200).render("dashboard", { approved });
});

app.listen(port, () => {
  console.log(`Application is runnig at port: ${port}`);
});
