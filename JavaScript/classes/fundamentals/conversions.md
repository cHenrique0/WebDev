# Conversões de tipo

O JavaScript é flexivel quanto aos tipos de valores que exige.Se pede uma `string`, ele converte **qualquer** valor fornecido em uma `string`. Se pede um `number`, ele tenta converter o valor fornecido para `number`(ou para `NaN`, caso não consigar realizar a conversão).

```js
console.log(10 + " objects");   // "10 objects": o número 10 é convertido em string
console.log("7" * "4");         // 28: as duas strings são convertidas em números
let n = 1 - "x";                // NaN: a string "x" não pode ser convertida em número
console.log(n + " objects");    // "NaN objects": NaN é convertido em string 'NaN'
```
Como os valores são convertidos de um tipo para outro está resumido na tabela abaixo:

**Valor**                           | **Tipo convertido** | | | |
 :---:                              | :---:          | :---:      | :---:       | :---:
|                                   | **String**     | **Number** | **Boolean** | **Object**
`undefined`                         | `"undefined"`  | `NaN`      | `false`     | `TypeError`
`null`                              | `"null"`       | `0`        | `false`     | `TypeError`
`true`                              | `"true"`       | `1`        |             | `new Boolean(true)`
`false`                             | `"false"`      | `0`        |             | `new Boolean(false)`
`""` (_string vazia_)               |                | `0`        | `false`     | `new String("")`
`"1.2"` (_não vazia, numerico_)     |                | `1.2`      | `true`      | `new String("1.2")`
`"one"` (_não vazia, não numérico_) |                | `NaN`      | `true`      | `new String("one")`
`0`                                 | `"0"`          |            | `false`     | `new Number(0)`
`-0`                                | `"-0"`         |            | `false`     | `new Number(-0)`
`NaN`                               | `"NaN"`        |            | `false`     | `new Number(NaN)`
`Infinity`                          | `"Infinity"`   |            | `true`      | `new Number(Infinity)`
`-Infinity`                         | `"-Infinity"`  |            | `true`      | `new Number(-Infinity)`
`1` (_finito, não zero_)            | `"1"`          |            | `true`      | `new Number(1)`
`{}` (_qualquer objeto_)            | `*`            | `*`        | `true`      |
`[]` (_array vazio_)                | `""`           | `0`        | `true`      |
`[9]` (_um elemento numérico_)      | `"9"`          | `9`        | `true`      |
`['a']` (_qualquer outro array_)    | use `.join()`  | `NaN`      | `true`      |
`function(){}` (_qualquer função_)  | `*`            | `NaN`      | `true`      |


## 1. Conversões e igualdade

Como JavaScrip é felxivel ao converter valores, o operador de igualdade `==` também é flexivel.
Todas as comparações abaixo retornan `true`:

```js
console.log(null == undefined); // os dois valores são tratados como iguais
console.log("0" == 0);          // a string é convertida em number antes da comparação
console.log(0 == false);        // o boolean é convertido em number antes da comparação
console.log("0" == false);      // os dois são convertidos em number antes da compração
```
## 2. Conversões explícitas

A forma mais simples de realizar uma conversão explícita é usando as funções `Boolean()`, `Number()`, `String()` ou `Object()` sem o operador `new`.

```js
Number("3");    // 3
String(false);  // 'false'
Boolean([]);    // true
Object(3);      // new Number(3)
```

### 2.1 Metódos de conversões explícitas

#### 2.1.1. String
Todo valor que  não seja `null` ou `undefined` possui um metódo toString() e o retorno é geralmente o mesmo que a função String().

```js
let n = 17;                 // inicializa n com um number
let str = n.toString();     // converte n em string e guarda em str
console.log(n);             // 17
console.log(typeof n);      // number
console.log(str);           // '17'
console.log(typeof str);    // string
```
#### 2.1.2. Number
##### a. toFixed

exemplo: //imprime em formato de moeda, no caso, Real Brasileiro
let salario = 1545.5
console.log(salario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}))
##### b. toExponential
##### c. toPrecision

#### 2.1.3. Parse
São funções globais e mais flexíveis(não são metódos de classes) e convertem strings em numbers.
Enquanto `parseInt()` analisa somente _inteiros_, `parseFloat()` analisa _inteiros_ e números em _ponto flutuante_.
Se uma string começa com "0x" ou "0X, `parseInt()` entende como um número **hexadecimal**.
As duas funções pulam espaços em branco à esquerda, analisam o máximo de caracteres numéricos que podem e ignoram tudo o que vem em seguida.
**Se o primeiro caractere que não é espaço não faz parte de uma literal numérica válida, as funções retornam `NaN`.

```js
parseInt("3 blind mice");   // 3
parseFloat(" 3.14 meters"); // 3.14
parseInt("-12.34");         // -12
parseInt("0xFF");           // 255
parseInt("0XFF");           // 255
parseInt("-0xFF");          // -255
parseFloat(".1");           // 0.1
parseInt("0.1");            // 0
parseInt(".1");             // NaN: inteiros não podem iniciar com '.'
parseFloat("$72.47");       // NaN: números não podem começar com '$'
```
### 2.2. Conversões de objeto para valores primitivos

