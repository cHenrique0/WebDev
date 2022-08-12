/* Renderizando arquivo html com os módulos http e fs */

const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((request, response) => {
  fs.readFile("./page.html", (error, file) => {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });

    response.write(file);

    return response.end();
  });
});

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
