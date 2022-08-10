class ContaBancaria {
  constructor(agencia, numero, tipo) {
    this._agencia = agencia;
    this._numero = numero;
    this._tipo = tipo;
    this._saldo = 0;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(valor) {
    this._saldo = valor;
  }

  sacar(valor) {
    if (valor > this._saldo) {
      return "Operação negada!";
    }

    this._saldo -= valor;
    return this._saldo;
  }

  depositar(valor) {
    this._saldo += valor;

    return this._saldo;
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(agencia, numero, cartaoCredito) {
    super(agencia, numero);
    this._tipo = "corrente";
    this._cartaoCredito = cartaoCredito;
  }

  get cartaoCredito() {
    return this._cartaoCredito;
  }

  set cartaoCredito(temCartao) {
    this._cartaoCredito = temCartao;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(agencia, numero) {
    super(agencia, numero, tipo);
    this._tipo = "poupança";
  }
}

class ContaUniversitaria extends ContaBancaria {
  constructor(agencia, numero) {
    super(agencia, numero, tipo);
    this._tipo = "universitária";
  }

  saque(valor) {
    if (valor < 0 && valor > 500) {
      return "Operação negada!";
    }
    super.sacar(valor);
  }
}
