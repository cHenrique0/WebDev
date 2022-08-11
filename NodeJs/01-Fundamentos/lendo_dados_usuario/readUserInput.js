// Lendo entrada do usuario com node puro (sem auxilio de modulos externos)

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual o seu nome?\n> ", (name) => {
  console.log(`Seu nome é: ${name.at(0).toUpperCase().concat(name.slice(1))}`);
  readline.close();
});
