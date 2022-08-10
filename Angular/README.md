# O que é Angular?

Angular uma plataforma de desenvolvimento, construída em [TypeScript](https://www.typescriptlang.org/). E possui:
* Uma estrutura baseada em componentes para construção de aplicações web escaláveis
* Uma coletção de bibliotecas integradas com ampla variedade de recuros, incluindo roteamento, gerenciameto de formulários, comunicação cliente-servidor, e mais.
* Um conjunto de ferramentos que ajudam a desenvolver, construir, testar e atualizar o código.

## Por que Angular?
O Angular possui várias vantagens, dentre elas:
* Estrutura de organização do projeto bem definida, promovendo simplicidade e reaproveitamento de código
* Integração nativa com TypeScript
* Conjunto de ferramentas: CLI, módulo HTTP, router, entre outras

## Instalação
Para instalar a CLI do Angular, execute o comando:
```bash
npm install -g @angular/cli
```
Com este comando, o angular será instalado globalmente, e assim poderá ser usado em qualquer pasta do computador.

## Criando um projeto
1. Para cria um novo projeto Angular basta executar o comando abaixo:
```bash
ng new project-name
```
2. O comando `ng new` pede informações sobre os recursos a serem incluídos no aplicativo. Para aceitar os padrões aperte a tecla **Enter**.

Esse comando instala os pacotes `npm ` Angular necessários e outras dependências. Além disso, cria um novo [_workspace_](#workspace) e um aplicativo de boas-vindas simples, pronto para ser executado.

## Executando
O CLI do Angular inclui um server, para criar e consumir localmente.
1. Nevegue até a pasta do workspace criado
2. Execute o comando:
```bash
ng serve --open
```
Este comando inicia o servidor, observa os arquivos, e reconstrói(_build_) o aplicativo enquanto fazemos mudanças nesses arquivos.
A flag `--open` ou `-o` abre automaticamente o navegador em `http://localhost:4200/`.

## Workspace
É uma coleção de projetos do Angular, ou seja, aplicações e bibliotecas criados pelo CLI do Angular que normalmente são colocados em um único repositório de versionamento de códigos como o [git](https://git-scm.com/).
O comando `ng new` cria uma pasta("a raíz do workspace). Nesta pasta, ele também cria o `angular.json`, um arquivo de configuração desse workspace. E, por padrão, um projeto de aplicativo inicial com o mesmo nome.

[Documentação Oficial do Angular](https://angular.io/docs)
