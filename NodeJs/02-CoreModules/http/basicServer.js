// Servidor http com node puro (sem auxilio de módulos externos/frameworks)

const http = require("http");

const port = 3000;

const server = http.createServer((request, response) => {
  response.write("Test HTTP");
  response.end();
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
