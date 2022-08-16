const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const basePath = path.join(__dirname, "templates");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// defining middleware function
const testMiddleware = (request, response, next) => {
  console.log("Testing middlewares functions");
  return next();
};

// use middleware
app.use(testMiddleware);

app.get("/", (request, response) => {
  return response.status(200).sendFile(`${basePath}/index.html`);
});

// middleware for page not found
app.use((request, response, next) => {
  return response.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
  console.log(`Application is running at port: ${port}`);
});
