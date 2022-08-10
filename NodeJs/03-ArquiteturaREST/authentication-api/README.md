# API para autenticação

Estudo sobre o desenvolvimento de uma API e integração com banco de dados.

### 1. Detalhes da API:
- será um microserviço de autenticação.
- gerencia o cadastro do usuário e a autenticação do usuário no sistema.

### 2. Rotas:

##### Usuário
  - `GET /users`: request de todos os usuários
  - `GET /users/:uuid`: request de um usuário especifico
  - `POST /users`: inserção de um usuário
  - `PUT /users/:uuid`: alteração do dados de um usário
  - `DELETE /users/:uuid`: deleção de um usuário

##### Autenticação
  - `POST /token`: obtenção do token para o login do usuario
  - `POST /token/validate`: validação do token

### 3. Ferramentas utilizadas:
- JavaScript
- TypeScript
- Node.js
- Express
- Postgres
- JWT - jsonwebtoken