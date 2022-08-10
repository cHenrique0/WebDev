# Objetos

Um _objeto_ é um valor composto. Ele agrega disversos valores que podem ser primitivos ou outros objetos.  
Um objeto é um conjunto não ordenado de _propriedades_, cada uma tendo um nome e um valor.  
Além de possuir seu próprio conjunto de propriedades, um objeto JavaScript também herda as propriedades de outro objeto, conhecido como seu **protótipo**. Normalmente, os métodos de um objeti são propriedades herdadas e essa _herança de protótipos_ é um recurso importante do JavaScript.  
  
Os objetos são _dinâmicos_: suas propriedades podem ser adicionadas e excluídas.  
**Qualquer** valor em JavaScript que não seja `string`, `number`, `true`, `false`, `null` ou `undefined`, é um objeto.  
Os objetos são _mutáveis_ e são manipulados por **referência** e não por valor.  
  
Uma _propriedade_ tem um nome e um valor. Um nome de propriedade pode ser qualquer string, incluindo a string vazia, mas nenhum objeto pode ter duas propriedades com o mesmo nome. O valor pode ser qualquer valor de JavaScript ou uma função _"getter"_ ou _"setter"_(ou ambas).  
  
Além de nome e valor, cada propriedade tem valores associados que são chamados de _atributos de propriedade_:

- O atributo _gravável_ indica se o valor da propriedade pode ser configurado.
- O atributo _enumerável_ indica se o nome da prorpriedade é retornado por um laço `for/in`.
- O atributo _configurável_ indifca se a propriedade pode ser excluída e seus atributos podem ser alterados.
  
Além de propriedades, todo objeto tem 3 _atributos de objeto_ associados:
- O _protótipo_ de um objeto é uma referência para outro objeto do qual as propriedades são herdadas.
- A _classe_ de um objeto é uma string que classifica o tipo de um objeto.
- A flag _extensível_ de um objeto indica se novas propriedades podem ser adicionadas.

## 1. Criando um objeto
Objetos podem ser criado com objetos literais, com a palavra-chave `new` e com a função `Object.create()`.

### 1.1 Objetos literais
Um _objeto literal_ é uma lista separada com vírgulas de pares _nome: valor_ colocados entre chaves.  
Um nome de propriedade é um identificador JavaScript ou uma string literal.  
Um valor de propriedade é qualquer expressão JavaScript. O valor da expressão, que pode ser um valor primitivo ou um valor de objeto, se troca o valor da propriedade.
```js
// Um objeto vazio(sem propriedades)
let empty = {};

// Um objeto com duas propriedades
let point = {
    x: 0,
    y: 0
};

// um objeto em que as propriedades possuem valores com expressões
let point2 = {
    x: point.x,
    y: point.y+1
};

/*
Um objeto onde os nomes das propriedades possuem espaçoes e hifens, por isso usam string literals.
for é uma palavra reservada, por isso usa aspas.
*/
let book = {
    "main title": "JavaScript",
    'sub-title': "The definitive guide",
    "for": "all audiences",

    // O valor da propriedade é outro objeto. Note que os nomes das propriedades não tem aspas.
    author: {
        firstname: "David",
        surname: "Flanagan"
    }
}
```

### 1.2 `new`
O operador `new` cria e inicializa um novo objeto.  
JavaScript contém construtores internos para tipos nativos:
```js
let o = new Object();       // cria um objeto vazio: equivale a {}
let a = new Array();        // cria um array vazio: equivale a []
let d = new Date();         // cria um objeto Date com a hora atual
let r = new RegExp("js");   // cria um objeto RegExp para comparação de padrões
```
Além de construtores internos, podemos definir nossas próprias funções construtoras.

### 1.3 `Object.create()`
É uma função estática e não um método chamado em objetos individuais. Para usa-lá basta passar o objeto protótipo desejado:
```js
const o1 = Object.create({ x: 1, y: 2 }); // o1 herda as propriedades x e y
```
Pode-se passar `null` para criar um novo objeto que não tem protóripo, então o objeto não vai herdar nada(nem mesmo metódos básicos):
```js
const o2 = Object.create(null); // o2 não herda propriedades nem métodos
```
Para criar um objeto vazio, pode-se passar `Object.prototype`:
```js
const o3 = Object.create(Object.prototype); // o3 é como {} ou new Object()
```

## 2. Consultando e configurando propriedades

Para obter o valor de uma propriedade podemos usar os operadores:
1. `.`(ponto): `obj.prop`
2. `[]`(colchetes): `obj["prop"]`

Para criar ou configurar uma propriedade basta fazer uma atribuição àquela propriedade.

```js
let book = {
    "main title": "JavaScript",
    'sub-title': "The definitive guide",
    "for": "all audiences",
    author: {
        firstname: "David",
        surname: "Flanagan"
    }
}
// consultado uma propriedade
book["main title"];     // "JavaScript"
book.author;            // retorna o objeto "author"
book.author.surname;    // "Flanagan"

// configurando ou criando uma propriedade
book.edition = 6;                   // criar a propriedade "edition"
bool["main title"] = "ECMAScript";  // altera o valor da propriedade "main title"
```

## 3. Excluindo propriedades
O operador `delete` remove uma proprieade de um objeto. Seu operando deve ser uma expressão de acesso à uma propriedade.
```js
const person = {
    firstname: "John",
    surname: "Silver",
    email: "jonh@silver.com"
};

delete person.email;
delete person.surname;

// agora person só possui a propriedade "firstname"
```
`delete` exclui apenas as propriedades **próprias**, não as herdadas(ver o topico #4 sobre Herança).

## 4. Herança

## 5. Testando propriedades
Objetos  em JavaScript podem ser considerados conjuntos de propriedades. É util verificar se um objeto tem uma propriedade com determinado nome. Isso é feito com o operador `in`, com os métodos `hasOwnProperty()` e `propertyIsEnumerable()` ou apenas consultado a propriedade.

1. O operador `in` esperar um nome de propriedade como string à esquerda e um objeto à direita e retorna `true` se o objeto possui a proprieadade(própria ou herdada).
```js
const o = { x: 1 }
"x" in o;           // true
"y" in o;           // false
"toString" in o;    // true: tem uma propriedade herdada toString
```
2. O método `hasOwnProperty()` testa se o objeto tem uma propriedade **própria**. Retorna `true` se tiver a propriedade passada. Se essa propriedade for herdada, retorna `false`:
```js
const o = { x: 1 }
o.hasOwnProperty("x");          // true: propriedade propria
o.hasOwnProperty("y");          // false
o.hasOwnProperty("toString");   // false: propriedade herdada
```
3. o método `propertyIsEnumerable()`
```js
```
4. Verificando se um objeto tem uma determinada propriedade apenas consultado:
```js
const o = { x: 1}
o.x !== undefined;          // true
o.y !== undefined;          // false
o.toString !== undefined;   // true
```

## 6. getter e setter de propriedadas
Propriedades definidas por métodos _getter_ e _setter_ são conhecidadas como **propriedades de acesso**.  
Um propriedade pode ser:
- leitura/gravação: possui ambos os métodos _getter_ e _setter_.
- somente de leitura: tem somente o método _getter_.
- somente de gravação: tem somente o método _setter_ e as tentativas de lê-la são sempre avaliadas como `undefined`.
A maneira mais fácil de definir propriedades de acesso é com uma extensão da sintaxe de objeto literal:
```js
const obj = {
    // propriedade de dados normal
    dataProp: value,

    // propriedade de acesso
    get acessorProp() {
        // escopo da função
    },
    set acessorProp() {
        // escopo da função
    }
}
```

## 7. Atributos de propriedade
CONTINUAR NA PAGINA 128
