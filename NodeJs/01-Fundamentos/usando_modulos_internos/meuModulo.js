/* Exportando um módulos */

module.exports = {
  soma(a, b) {
    console.log(a + b);
  },
  sub(a, b) {
    console.log(a - b);
  },
  mult(a, b) {
    console.log(a * b);
  },
  div(a, b) {
    console.log(a / b);
  },
};

// outra forma:
/* function one(params) {
  // code
}
function two(params) {
  // code
}
function n(params) {
  // code
}
module.exports = { one, two, ..., n };
*/
