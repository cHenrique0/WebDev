## Varaiáveis:

- São nome simbólicos para receber algum valor ou atalhos de códigos;
- Também conhecidas como **Identificadores**(`identifiers`)

Os nomes das váriveis devem seguir as regras:
- Podem começar com `letra`, `$` ou `_`
- **Não** podem começar com números;
- É possivel misturar **letras** e **numeros**;
- É possível usar **acentos** e **símbolos**;
- **Não** pode conter **espaços**;
  - Utilizar **CamelCase** ou **snake_case**
- **Não** podem ser **palavras reservadas**(`function`, `alert`, `document`, etc...)

Existem algumas formas para se declarar uma váriavel no JavaScript. Para isso usa-se as palavras reservadas `var`, `let` e `const`:
1. Usando `var`:
    `var nome_variavel = valor;`

2. Usando `let`:
    `let nome_variavel = valor;`
    - _obs_: Variavel declarada como `let` não pode ser '_redeclarada_' no escopo do programa.
 
3. Usando `const`:
    `const nome_variavel = valor;`
    - _obs_: Ao usar const para declarar uma variavel, ela não poderá ter seu valor alterado durante a execução do programa.

```js
// Usando var:
var x = 5;
var y = 6;
var z = x + y;

// Usando let
let a = 10;
let b = 13;
let c = a - b;

// Usando const
const pi = 3.1415;
const preco1 = 4;
const preco2 = 5;
let total = preco1 + preco2;

// Redeclarando variaveis
var x = 100;
var x = 0;  // isso funciona

let y = 50;
let y = 0; // isso não funciona e gera um SyntaxError
```
Uma variável declarada usando `var` ou `let` sem especificar um valor inicial tem o valor `undefined`.
Acessar uma variável **não** declarada retorna uma exceção `ReferenceError`.

```js
let a;
console.log(a);  // undefined
console.log(b);  // ReferenceError
```

### Dicas

- O JavaScript é **case sensitive**, ou seja, maíusculas e minusculas fazem diferença
- Dar nomes **coerentes** e que fazem sentido