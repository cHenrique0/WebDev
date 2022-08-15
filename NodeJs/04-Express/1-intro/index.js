// express import
const express = require("express");

// express instance
const app = express();
// port definition
const port = 3000;

// creating a simple route
app.get("/", (request, response) => {
  // response for GET request
  return response.status(200).send({
    message: "Hello Express!",
  });
});

// Starting application
app.listen(port, () => {
  console.log(`Application is runnig at port: ${port}`);
});
