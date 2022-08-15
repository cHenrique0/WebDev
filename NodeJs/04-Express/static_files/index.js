const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const basePath = path.join(__dirname, "templates");

/* Using static files(css, images, other files)
 *
 * 'public' is the name of the folder where the static files are
 * to use the static files just use the url '/subfolder/file'
 */
app.use(express.static("public"));

app.get("/", (request, response) => {
  return response.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Application is running at port: ${port}`);
});
