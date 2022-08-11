// Servidor http com node puro - retornando html através do response

const http = require("http");

const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.end(`
  <h1>Testing HTTP node module</h1>
  <h2>HTML response</h2>`);
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
