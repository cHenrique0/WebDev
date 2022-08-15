const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const basePath = path.join(__dirname, "templates");

app.get("/", (request, response) => {
  return response.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Application is running at port: ${port}`);
});
