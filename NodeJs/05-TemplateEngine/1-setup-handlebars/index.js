const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

// set up handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (request, response) => {
  return response.status(200).render("home"); // rendering view or template
});

app.listen(port, () => {
  console.log(`Application is runnig at port ${port}`);
});
