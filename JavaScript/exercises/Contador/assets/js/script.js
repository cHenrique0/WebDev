// Variavel para armazenar o elemento. No caso um <span>
let currentNumberWrapper = document.getElementById("currentNumber");

// Variavel para incrementar ou decrementar o contador
let currentNumber = 0;

function increment() {
  currentNumber += 1; // incrementa o contador
  currentNumberWrapper.innerHTML = currentNumber; // atualiza o numero no html
  if (currentNumber > 0) {
    currentNumberWrapper.style.color = "lightgreen";
  }
  if (currentNumber > 10) {
    alert("Contador chegou ao máximo");
    reset();
  }
}

function decrement() {
  currentNumber -= 1; // decrementa o contador
  currentNumberWrapper.innerHTML = currentNumber; // atualiza o numero no html
  if (currentNumber < 0) {
    currentNumberWrapper.style.color = "red";
  }
  if (currentNumber < -10) {
    alert("Contador chegou ao minimo");
    reset();
  }
}

function reset() {
  currentNumber = 0;
  currentNumberWrapper.innerHTML = 0;
  currentNumberWrapper.style.color = "white";
}
