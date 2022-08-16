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

  return response.status(200).render("home", { user }); // sending data to view
});

app.listen(port, () => {
  console.log(`Application is runnig at port: ${port}`);
});
