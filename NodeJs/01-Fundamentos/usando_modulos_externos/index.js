// módulo que ajuda a capturar os argumentos via CLI
const minimist = require("minimist");

// Usar -- para nomear um argumento:
// node index.js --nome=Claudio --altura=1.85
const args = minimist(process.argv.slice(2)); // retorna um objeto com os argumentos passados
console.log(args);

const { nome } = args;
const { altura } = args;

console.log(`> ${nome} tem ${altura}m de altura`);
