# Date and Time

Para criar objetos que representam datas e horas usamos o construtor `Date()`.
O objeto `Date` possui métodos que fornecem uma _API_ para cálculos simples de data.
Observe que esses objetos **não** são um tipo fundamental como o `number`.

Usando `Date()`:

```js
let then = new Date(2020, 0, 1);                // 01/01/2020
let later = new Date(2020, 0, 1, 17, 10, 30);   // 01/01/2020 - 17:10:30, horario local
let noew = new Date();                          // data e hora atuis
let elapsed = now - then;                       // intervalo de tempo(em milissegundos)
later.getFullYear();                            // 2020
later.getMonth();                               // 0: meses com base em zero
later.getDate();                                // 1: dias com base em um
later.getDay();                                 // 3: dia da semana. 0 é domingo, 6 é sabado
later.getHours();                               // 17: 5 da tarde, hora local
later.getUTCHours();                            // Horas em UTC; depende do fuso horário
later.toString();                               // 'Wed Jan 01 2020 17:10:30 GMT-0300 (Brasilia Standard Time)'
later.toUTCString();                            // 'Wed, 01 Jan 2020 20:10:30 GMT
later.toLocaleDateString();                     // '01/01/2020'
later.toLocaleTimeString();                     // '05:10:30 PM'
later.toISOString();                            // '2020-01-01T20:10:30.000Z'
```