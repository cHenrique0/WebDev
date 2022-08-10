// Desafio 3
let botaoAtualizar = document.getElementById(
  "atualizar-saldo"
) as HTMLButtonElement;
let botaoLimpar = document.getElementById("limpar-saldo") as HTMLButtonElement;
let soma = document.getElementById("soma") as HTMLInputElement;
let campoSaldo = document.getElementById("campo-saldo") as HTMLSpanElement;

campoSaldo.innerHTML = "0";

const somarAoSaldo = (soma: number) => {
  let total = Number(campoSaldo.textContent) + soma;
  campoSaldo.innerHTML = total.toString();
};

const limparSaldo = () => {
  campoSaldo.innerHTML = "0";
};

const limparInputSoma = () => {
  soma.value = "";
};

botaoAtualizar.addEventListener("click", () => {
  somarAoSaldo(Number(soma.value));
  limparInputSoma();
});

botaoLimpar.addEventListener("click", () => {
  limparSaldo();
  limparInputSoma();
});
