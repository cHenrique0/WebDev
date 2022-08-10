# Comandos uteis para criação de uma REST API

## 1. Configurações iniciais do projeto

1. Executar `npm init` para criar um arquivo `package.json` com as configurações do projeto.
2. Executar `npm install <package-name> --save` para instalar os pacotes necessário para auxiliar na criação da API.
   - a flag `--save` serve para indicar que o pacote é uma dependencia do projeto. Ao executar o comando `npm install` todas as dependencias serão instaladas no projeto.
   - a flag `-D` ou `--save-dev` indica que o pacote é uma dependencia apenas no desenvovimento da API.
3. Talvez seja interessante usar TypeScript, para isso deve-se executar o comando `npm install -g typescript` para instalá-lo globalmente.
   - Após a instalação, executar `tsc --init` para acoplar o TypeScript ao projeto node
     - Verificar as configurações no arquivo `tsconfig.json` criado.
   3.1 Podemos instalar o TypeScript apenas como dependênncia de desenvolvimento: 
     - `npm install typescript --save-dev`
     - `npm install --save-dev @types/node`
     - Após a instalação executar o comando `npx tsc --init` 
     - Criar um comando `build` no `package.json`: `"build": "tsc -p ."`
     - para executar o build: `npm run build`
4. Criar uma pasta `src` com um arquivo `index.ts` na raiz do projeto
   - criar um comando `start` no `package.json`: `"start": "node ./"`
     - para executar o start: `npm run start`
   - mudar o `main` no `package.json` para `./dist/index.js`
     - os arquivos transpilado estarão na pasta `./dist`
5. Criar um `.gitignore` e colocar as pastas `dist` e `node_modules`

## 2. Instalando e configurando o Express


1. Para instalar o `express` basta executar os comandos:
   - `npm install --save express` para adicionar o express como dependencia da API
   - `npm install --save-dev @type/express` para adicionar os tipos do express
2. Para configurar um servidor `http`:
   - importar o express no `index.ts` com `import express from "express"`
     - Como é uma implementação em TypeScript, devemos importar os tipos como: Request, Response, NextFunction
   - criar uma instancia do express importado: `const app = express()`
   - fazer a instancia criada(`app`) ouvir uma porta desocupada(`3000`, `5500`)

## 3. Adicionando e configurando banco de dados(Postgres)

1. instalar o banco de dados: `npm install --save pg`
2. instalar os @types do banco: `npm install --save-dev @types/pg`
3. criar um arquivo `db.ts` para configurações do banco
   - importar `Pool` para criar uma conexão com o banco de dados
   - a conexão pode ser feita de várias formas: usando connectionString, usando as credenciais do banco(name, host, port, etc)
   - ler sobre `dotenv`(variaveis de ambiente)
4. 
5. Normalmente cria-se uma pasta `sql` com um arquivo `init.sql` com o script de criação do banco de dados.

## 4. Criar as rotas

1. Criar uma pasta `routes` para armazenar os arquivos referentes às rotas da API
2. implementar as rotas

### Pacotes úteis
Instalar todos como dev dependencie: `--save-dev` ou `-D`
1. `nodemon` - identifica auterações no código
2. `http-status-code` - pacote de constantes com os códigos de status http(200, 404, etc)
3. `ts-node-dev` - adicionar o comando nos scripts do `package.json` para identificar auterações no codigo e executar o build e start do servidor automaticamente
   - `ts-node-dev --respawn --transpile-only --ignore-watch node_modules --no-notify src/index.ts`
4. `dotenv` - criação de variaveis de ambiente
5. Site: ElephantSQL - criação de banco de dados online