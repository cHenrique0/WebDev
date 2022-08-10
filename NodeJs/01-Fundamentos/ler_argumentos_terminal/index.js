/*
Para ler argumentos via CLI é necessário ler o conteudo do array 'process.argv'

Se imprimir o conteudo desse array teremos:
    * o executavél do node
    * o arquivo que está sendo executado
    * os argumentos extras caso informados
*/

// console.log(process.argv);

/*
Para adicionar um argumento basta escrever após o node do arquivo. Ex:
    * node index.js arg1 arg2=Argumento arg3
*/

// Capturando os argumentos passados

const args = process.argv.slice(2); // retorna um array a partir da posição 2 do array original
// console.log(args);

let nome = args[0].split("=")[1];
let altura = args[1].split("=")[1];

console.log(`> ${nome} tem ${altura}m de altura`);
