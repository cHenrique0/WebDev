/* Algumas formas de importar um módulo interno e seus métodos */
// módulo interno -> são módulos desenvolvidos durante o desenvolvimento de um projeto

// 1. Usando a função require
console.log("<==> Usando require <==>");
// 1.1. importando o módulo todo
const meuModulo = require("./meuModulo"); // necessário usar o ./ para dizer ao node que é um módulo interno
meuModulo.soma(2, 5);

// 1.2. encapsulando a funçao numa variável
const sub = meuModulo.sub;
sub(2, 5);

// 1.3. importando um método especifico
const { mult, div } = require("./meuModulo");
mult(2, 5);
div(2, 5);

/*
Para usar import/from é necessário que tanto o arquivo do módulo quanto o
arquivo que vai importar o módulo tenham a extensão .mjs
*/
/* console.log("\n<==> Usando import <==>");
import { teste } from "./meuModulo.mjs";
teste(); */
