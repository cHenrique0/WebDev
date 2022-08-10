// Como podemos melhorar o esse código usando TS?
/*
let pessoa1 = {};
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = "atriz"

let pessoa2 = {}
pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = "Padeiro";

let pessoa3 = {
    nome: "laura",
    idade: "32",
    profissao: "Atriz"
};

let pessoa4 = {
    nome = "carlos",
    idade = 19,
    profissao = "padeiro"
}
*/

export class Pessoa {
  private nome: string;
  private idade: number;
  private profissao: Profissao;

  constructor(nome: string, idade: number, profissao: Profissao) {
    this.nome = nome;
    this.idade = idade;
    this.profissao = profissao;
  }

  public get Nome() {
    return this.nome;
  }

  public get Idade() {
    return this.idade;
  }

  public get Profissao() {
    return this.profissao;
  }
}

export enum Profissao {
  Padeiro,
  Atriz,
}

let pessoa1 = new Pessoa("Maria", 29, Profissao.Atriz);
let pessoa2 = new Pessoa("Robert", 19, Profissao.Padeiro);
let pessoa3 = new Pessoa("Laura", 32, Profissao.Atriz);
let pessoa4 = new Pessoa("Carlos", 19, Profissao.Padeiro);
