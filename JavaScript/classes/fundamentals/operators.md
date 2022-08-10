# Operadores

Operadores em JavaScript são utilizados para expressões _aritméticas_, _de comparação_, _lógicas_, _de atribuição_, entre outras.

A tabela abaixo resume os operadores:

Operador      | Operação                     | A<sup>[[1]](#obs1)</sup> | N<sup>[[2]](#obs2)</sup> | Tipos<sup>[[3]](#obs3)</sup>
:---:         | :---:                        | :---:                    | :---:                    | :---:
`++`          | pré ou pós-incremento        | D                        | 1                        | lval->num
`--`          | pré ou pós-decremento        | D                        | 1                        | lval->num
`-`           | Nega o número                | D                        | 1                        | num->num
`+`           | Converte para número         | D                        | 1                        | num->num
`~`           | Inverte bits                 | D                        | 1                        | int->int
`!`           | Inverte valor booleano       | D                        | 1                        | bool->bool
`delete`      | Remove uma propriedade       | D                        | 1                        | lval->bool
`typeof`      | Determina o tipo de operando | D                        | 1                        | any->str
`void`        | Retorna valor indefinido     | D                        | 1                        | any->undefined
`*`, `/`, `%` | Multiplica, divide, resto    | E                        | 2                        | num, num, num -> num
`+`, `-`      | Soma, subtrai                | E                        | 2                        | num, num -> num
`+`           | Concatena strings            | E                        | 2                        | str, str -> str
`<<`          | Desloca para a esquerda      | E                        | 2                        | int, int->int

FAZER O RESTO (pagina 62)


<a name="obs1">[1]</a>:
<a name="obs2">[2]</a>
<a name="obs3">[3]</a>

Os operadores aritméticos básicos são * (multiplicação), / (divisão), % (módulo: resto da divisão), + (adição) e - (subtração).
Exceto o operador de adição, os demais simplesmente avaliam seus operandos, convertem os valores em `number`, se necessário, e então calculam o _produto_, _quociente_, _resto_ ou a _diferença_ entre os valores.
Operandos **não** numéricos que **não** podem ser convertidos em `number` são convertidos no valor `NaN`. Se um dos operandos é, ou é convetido em, NaN, o  resultado da operação também é `NaN`.


## 1. Operador `+`

O operador + é binário, ou seja, aceita dois operandos. Ele _soma_ `number` ou _concatena_ `string`:

```js
1 + 2                       // 3
'hello' + ', ' + 'world!'   // 'hello, world!'
'1' + '2'                   // '12'
```
Quando ambos os operandos são `number` ou `string`, o operador soma ou concatena.
Porém, em qualquer outro caso, é realizada a conversão de tipo e a operação a ser efetuada depende desta conversão.
As regras de conversão do operador `+` dão prioridade para a concatenação de `strings`.
Se um dos operandos for uma `string` ou um `object` que é convertido em `string`, o outro operando também será convertido em `string` e a concatenação será realizada.
A adição é feita somente se **nenhum** dos operandos for uma `string`.

```js
1 + 2                      // 3: adição
'1' + '2'                  // '12': concatenação
'1' + 2                    // '12': concatenação após a conversão do 2 em string
1 + {}                     // '1[object Object]': converte {} para string e concatena
true + true                // 2: soma após converter bool para number
2 + null                   // 2: realiza a conversão null para 0 e soma
2 + undefined              // NaN: converte undefined em NaN e soma
1 + 2 + " blind mice"      // "3 blind mice"
1 + (2 + " blind mice")    // "12 blind mice"
```

## 2. Operadores aritméticos unários

Operadores unários modificam o valor de um **único** operando para produzir um _novo valor_.
**Todos** os operadores aritméticos unários citados a seguir convertem o operando em um `number`, se necessário.
- Observe que `+`e `-`são usados tanto como operadores unários como binários.

### 2.1. Mais unário(+)

O operador _mais unário_ converte seu operando em um `number` (ou em `NaN`) e retorna esse valor convertido. Se o operando já for um `number` ele não faz nada.

### 2.2. Menos unário(-)

Quando `-` é usado como operador unário, ele converte seu operando em um `number`, se necessário, e depois troca o sinal do resultado.

### 2.3. Incremento (++)

O operador ++ incrementa seu único operando, que deve ser um `lvalue`(uma variável, um elemento de array ou uma propriedade de objeto).
O operador converte seu operando em `number`, soma 1 a esse número e atribui o resultado à variavel, elemento ou propriedade.

**Observação:**
O valor de retorno depende da posição relativa ao operando.
1. pré-incremento:
   - Usado antes do operando
   - incrementa o operando
   - avaliado com o valor incrementado
2. pós-incremento:
   - usado depois do operando
   - incrementa o operando
   - mas é avaliado com o valor não incrementado

```js
let i = 1, j = ++i;  // i e j são 2
let i = 1, j = i++;  // i é 2, j é 1
```

### 2.4. Decremento(--)

O operador `--` espera um operando `lvalue`. Ele converte o valor do operando em `number`, subtrai 1 e atribui o valor decrementado ao operando.
Funciona como o _Incremento_ quanto a posição do operador em relação ao operando.

## 3. Expressões Relacionais

Esses operadores testam uma relação entre dois valores e  retornam `true` ou `false`, dependendo da existência dessa relação.

### 3.1. Operadores de igualdade e desiqualdade

Há dois operadores que verificam se dois valores são os mesmos: `==` e `===`, porém eles utilizam definições diferentes de semelhança.
Os dois operadores aceitam operandos de qualquer tipo e retornam `true` se os operandos são os mesmos e `false` se são diferentes.
- O operador `===` é conhecido como operador de igualdade restrita e verifica se seus dois operandos são "idênticos", usando uma definição restrita de semelhança.
- O operador `==` é conhecido como operador de igualdade. Ele verifica se seus dois operandos são "iguais", usando uma definição mais relaxada de semelhança que permite conversões de tipo.

Os operadores `!=` e `!==` testam **exatamente** o oposto de `==` e `===`.
O operador de desigualdade `!=` retorna `false` se dois valores são iguais de acordo com `==` e `true` caso contrário.
O operador `!==` retorna `false` se dois valores são **rigorosamente** iguais, caso contrário retorna `true`.

O operador de igualdade restrita `===` avalia seus operandos e, então, compara os dois valores, não fazendo conversão de tipo:

  - Se os dois valores tem tipos diferentes, eles **não são** iguais.
  - Se os dois valores são `null` ou `undefined`, eles **são** iguais.
  - Se os dois valores são o valor booleano `true` ou ambos são o valor booleano `false`, eles **são** iguais.
  - Se um ou os dois valores são `NaN`, eles **não são** iguais. (O valor `NaN` _nunca_ é igual a qualquer outro valor, incluindo ele mesmo).
  - Se os dois valores são `number` e têm o mesmo valor, eles são iguais.(Se um valor é 0 e o outro é -0, eles também são iguais)
  - Se os dois valores são `strings` e contêm exatamente os mesmos valores de 16 bits nas mesmas posições, eles são iguais. Se as strings diferem no comprimento ou no conteúdo, eles não são iguais.
  - Se os dois valores se referem ao mesmo objeto, array ou função, eles são iguais. Se eles se referem a objetos diferentes, não são iguais, mesmo que os dois objetos tenham propriedades idênticas.

O operador de igualdade `==` é como o operador de igualdade restrita mas menos restrito:

  - Se os dois valores não têm o mesmo tipo, o operador `==` ainda pode considerá-los iguais. Ele usa as seguintes regras e conversões de tipo para verificar a igualdade:
    - Se um valor é `null` e o outro é `undefined`, eles são iguais.
    - Se um valor é um `number` e o outro é uma `string`, converte a `string` em um `number` e tenta a comparação novamente, usando o valor convertido.
    - Se um valor é um `objeto` e o outro é um `number` ou uma `string`, converte o objeto em um valor primitivo e tenta a comparação novamente.
    - Qualquer outra combinação de valor não é igual.