# Arrays

Um _array_ é um conjunto ordenado de valores. Cada valor é chamado de _elemento_ e cada elemento tem uma posição no array, conhecida como _índice_.  
Os arrays em JavaScript são **não-tipados**, ou seja, um array pode conter elementos de tipos diferentes.  
Os arrays são _dinâmicos_, eles crescem ou diminuem conforme a necessidade e não é preciso declarar um tamanho fixo para o array ao criá-lo.  

## 1. Criando um array
### 1.1 Usando array literal
É simplesmente uma lista de elementos separados por vírgulas dentro de colchetes.
```js
var empty = []; // Array sem elementos
var primes = [2, 3, 5, 7, 11];  // array com 5 elementos do tipo number
var misc = [1.1, true, "a"];    // array com 3 elementos de tipos diferentes
```
Um array pode conter `objects` ou outros `arrays`:
```js
var array = [[1, {x:1, y:2}], [2, {x?3, y:4}]];
```
### 1.2 Usando Array()
Outra forma de criar um array é usando o construtor `Array()`. Essa forma pode ser chamada de 3 maneiras:

- Chamada sem argumentos:
```js
let a = new Array();
```
Cria um array vazio. Equivalente ao array literal [].
- Chama com um argumento numérico, que especifica um comprimento
```js
let a = new Array(10);
```
Cria um array com um comprimento especificado. Ideal para fazer alocação prévia de um array quando se sabe antecipadamento quantos elementos serão necessários.
- Chamada com 2 ou mais elementos do array
```js
let a = new Array(5, 4, 3, 2, 1, "teste, teste");
```
Cria um array com os argumentos do construtor como elementos.

## 2. Manipulando Arrays
### 2.1. `length`
Todo array possui a propriedade `length` que retorna a quantidade de elementos.
```js
let a = [];
Console.log(a.length);  // 0
let b = ['a', 'b', 'c'];
Console.log(b.length);  // 3
```
**OBS:** se configurarmos a propriedade length com um inteiro não negativo **n** menor
do que seu valor atual, todos os elementos do array cujo índice é maior ou igual a **n** são excluídos do array:
```js
let a = [1, 2, 3, 4, 5]; // Começa com um array de 5 elementos.
a.length = 3;        // a agora é [1,2,3].
a.length = 0;        // Exclui todos os elementos. a é [].
a.length = 5;        // O comprimento é 5, mas não há elementos.
```
### 2.2. `forEach()`
Itera um array aplicando uma função expecificada para cada elemento.
```js
var data = [1, 2, 3, 4, 5]
var sumOfSquares = 0;
data.forEach(function(x) {
    sumOfSquares += x*x;
});
Console.log(sumOfSquares); // 55 (1 + 4 + 9 + 16 + 25)
```

### 2.3. `push()`
Adiciona um ou mais elementos no fim do array.
```js
let a = [];
a.push("zero");         // a = ["zero"]
a.push("one", "two");   // a = ["zero", "one", "two"]
```

### 2.4. `pop()`
Remove um elemento do fim do array.
```js
let a = [1, 2, 3, 4];
a.pop(); // a: [1, 2, 3]
```

### 2.5. `shift()`
Remove um elemento do inicio do array
```js
let a = [5, 4, 3, 2, 1];
a.shift();  // a: [4, 3, 2, 1]
a.shift();  // a: [3, 2, 1]
```

### 2.6. `unshift()`
Adiciona um elemento no inicio do array
```js
let a = [];
a.unshift(1);  // a: [1]
a.unshift(2);  // a: [2, 1]
a.unshift(3, 4);  // a: [3, 4, 2, 1]
```

### 2.7. `indexOf()` e `lastIndexOf()`
Retorna o indice um elemento do array
```js
let a = [0, 1, 2, 1, 0];
a.indexOf(1);     // 1
a.lastIndexOf(1); // 3
a.indexOf(3);     // -1: nenhum elemento tem o valor 3
```

### 2.8. `splice()`
Remove ou substitui um elemento pelo índice. Modifica o array em que é chamado.  
Os dois primeiros argumentos especificam quais elementos do array devem ser excluídos.  
O primeiro argumento indica a posição em que a inserção/exclusão deve começar.  
O segundo indica o número de elementos que devem ser excluídos do array.
Esse argumentos podem ser seguidos por qualquer quantidade de argumentos adicionais, indicando quais os elementos a serem inseridos no array, começando na posição indicada pelo primeiro argumento.  
```js
let a = [1, 2, 3, 4, 5, 6, 7, 8];
a.splice(4);    // retorna [5, 6, 7, 8]. a agora é [1, 2, 3, 4]
a.splice(1, 2); // retorna [2, 3]. a agora é [1, 4]
a.splice(1, 1); // retorna [4]. a agora é [1]

let b = [1, 2, 3, 4, 5];
b.splice(2, 0, 'a', 'b');  // Retorna []; b é [1, 2, 'a', 'b', 3, 4, 5]
b.splice(2, 2, [1, 2], 3); // Retorna ['a', 'b']; b é [1, 2, [1, 2], 3, 3, 4, 5]
```

### 2.9. `slice()`
Retorna uma parte de um array. Não modifica o array em que é chamado.
```js
let a = [1, 2, 3, 4, 5];
a.slice(0, 3);  // retorna [1, 2, 3];
```

### 2.10. `map()`
Mapea cada elemento do array em uma função especificada e retorna um array contendo os valores retornados por essa função.
```js
let a = [1, 2, 3];
let b = a.map(function(x) {
    return x*x;
});
Console.log(b); // [1, 4, 9]
```

### 2.11. `filter()`
Retorna um array contendo um subconjunto dos elementos do array em que é
chamado. A função passada deve ser um predicado: uma função que retorna true ou false.
```js
let a = [5, 4, 3, 2, 1];
let smallValues = a.filter(function(x) { 
    return x < 3;
}); // [2, 1]

let oddIndex = a.filter(function(x, i) {
    return i%2==0; 
}); // [5, 3, 1]
```
