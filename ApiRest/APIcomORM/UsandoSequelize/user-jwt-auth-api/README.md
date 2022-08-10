# API com Sequelize e JWT

Um exemplo de api usando sequelize para persistência de dados e JWT(json webtoken)  para autenticação de usuário.

## Descrição da API

## Rotas
| Metódos | Url                | Ações                      |
| :------ | :----------------- | :------------------------- |
| `POST`  | `/api/auth/signup` | signup new account         |
| `POST`  | `/api/auth/signin` | login an account           |
| `GET`   | `/api/test/all`    | retrieve public content    |
| `GET`   | `/api/test/user`   | access User’s content      |
| `GET`   | `/api/test/mod`    | access Moderator’s content |
| `GET`   | `/api/test/admin`  | access Admin’s content     |

## Ferramentas

* Nodejs
* TypeScript
* Sequelize
* Sequelize-TypeScript
* JWT
* PostgreSQL
* Express
* bcryptjs