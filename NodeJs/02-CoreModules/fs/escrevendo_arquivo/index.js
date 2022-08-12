/* Escrevendo arquivo com módulo fs (File System) */

const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((request, response) => {
  const urlInfo = url.parse(request.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("./index.html", (error, file) => {
      response.writeHead(200, {
        "Content-Type": "text/html",
      });

      response.write(file);

      return response.end();
    });
  } else {
    const line = `name: ${name}\n`;
    // fs.writeFile > escreve um arquivo novo ou sobrescreve um arquivo já existente
    fs.appendFile("./names.txt", line, (error, file) => {
      response.writeHead(302, {
        Location: "/",
      });
      return response.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
