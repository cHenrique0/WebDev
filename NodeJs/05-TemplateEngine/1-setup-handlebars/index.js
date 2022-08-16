const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

// set up handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (request, response) => {
  // using layout: false because we don't have any layouts yet
  return response.status(200).render("home", { layout: false });
});

app.listen(port, () => {
  console.log(`Application is runnig at port ${port}`);
});
