const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (request, response) => {
  return response.status(200).render("home");
});

app.listen(port, () => {
  console.log(`Application is runnig at port: ${port}`);
});
