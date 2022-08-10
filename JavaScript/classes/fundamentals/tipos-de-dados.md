# Tipos de dados

Segundo o [**ECMAScrip standard**](https://tc39.es/ecma262/multipage/) temos alguns _tipos de dados_:

## Data Types:
1. **Primitive:**
   - `String`
   - `Number`
   - `Boolean`
   - `undefined`
   - `Symbol`
   - `BigInt`
2. **Structural:**
   - 2.1. _Object_:
     - `Array`
     - `Map`
     - `Set`
     - `Date`
     - `...`
   - 2.2. _Functions_ 
3. **Structural Root Primitve**
   - `null`

## 1. String

- É uma cadeia de caracteres.
- Serve para escrever textos.
- Para definir um string usa-se:
  1. Aspas duplas: `"minha string"`.
  2. Aspas simples: `'minha outra string'`.
  3. Crase: <code>``</code>.
     - a crase serve para template literals ou template strings.
     - serve também para escrever em multiplas linhas.
     - aceita expressões dentro da string(interpolação).
     - além disso, a crase permite escrever `"` e `'` na string.
- Um _string_ em JavaScript é **imutável**.

```js
console.log("Minha primeira string");
console.log('Minha segunda string');
console.log(`Interpolação ${1 + 1}`);
console.log(`Usando 'crase' para "escrever" strings`);

// Algumas manipulações de strings:
let str = "hello, world"
str.charAt(0);           // 'h': o primeiro caractere
str.charAt(s.length-1);  // 'd': o último caractere
str[0];                  // mesmo efeito da função charAt().
str.substring(1,4);      // 'ell': o 2º, 3º e 4º caracteres.
str.slice(1,4);          // 'ell': a mesma coisa da função substring().
str.slice(-3);           // 'rld': os últimos 3 caracteres
str.indexOf("l");        // 2: posição da primeira letra l.
str.lastIndexOf("l");    // 10: posição da última letra l.
str.indexOf("l", 3);     // 3: posição do primeiro "l" em ou após 3
str.split(", ");         // ["hello", "world"] divide em substrings
str.replace("h", "H");   // "Hello, world": substitui todas as instâncias
str.toUpperCase();       // "HELLO, WORLD"
```
**Obs:** como as strings são imutáveis, metódos como replace() e toUpperCase() não modificam a string, e retornam um novas strings.

## 2. Number

- São os números;
- Dentro do number temos:
    1. Inteiros: `33, 10, 2,...`;
    2. Reais(float): `34.2, 4.5, ...`;
    3. NaN - `Not a Number`; 
    4. Infinito: `Infinity`;
- JavaScript não faz distinção entre inteiros e reais(floats);
- Os números são representados em formato de _ponto flutuante_ de 64 bits;
- Pode representar números tão grandes quanto ±1,7976931348623157×10<sup>308</sup> e tão pequenos quanto ±5×10<sup>−324</sup>.
- Pode representar números entre −9007199254740992 (−2<sup>53</sup>) e 9007199254740992 (2<sup>53</sup>).


## 3. Boolean

- Tem apenas dois valores:
  - Verdadeiro: `True`;
  - Falso: `False`;
- Os valores abaixo se comportam como `false`:
  - `undefined`
  - `null`
  - `0`
  - `""` (string vazia)

```js
console.log(undefined == false)   // true
console.log(null == false)        // true
console.log(0 == false)           // true
console.log("" == false)          // true
```


## 4. Null

- Normalmente utilizado para indicar a ausência de um valor
- null é um **object** em JavaScript
- Objeto que não possui conteúdo


## 5. Undefined

- Indefinido
- É algo que não existe
- Diferente de null
- Resulta da utilização de variáveis que não foram inicializadas, da consulta de valor de uma propriedade de objeto ou elemento de array que não existem
- É o retorno de funções que não tem valor de retorno
- Não é uma palavra chave mas uma **variável global** predefinida que é inicializada com o valor indefinido

**Obs:** 
Apesar das diferenças, `null` e `undefined` indicam ausência de valor e muitas vezes podem ser usados sem distinção
Ambos são valores falsos e se comportam como `false` quando um _boolean_ é exigido
Nenhum dos dois tem propriedades ou metódos


```js
console.log(null == undefined);  // true
console.log(null === undefined); // false 
```

## 6. Object

- Objeto;
- É um tipo de dado estrutural;
- Possui propriedades/atributos e funcionalidades/metodos;
- Definindo um objeto:
  - `{ propriedade: "valor" }`

```js
console.log({
    name: "Marcos",
    age: 23,
    walk: functions() {
        console.log('walking');
    }
})
```

## 7. Arrays

- São vetores;
- É uma lista que agrupa dados;
- Definindo um array:
  - `[dados, dados, dados,...]`

```js
console.log([
    "Milk",
    "Eggs",
    2,
    3
])
```

**[Saiba Mais](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)**