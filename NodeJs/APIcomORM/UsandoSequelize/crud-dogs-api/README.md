# API com Sequelize

Uma API básica para aprender como o funcionamento do Sequelize como ORM.

## Descrição da API
A api faz um **CRUD** de cães.
A classe [`Dog`](src/models/dog.model.ts) modela o cão e com ajuda dos decorators do `sequelize-typescript` cria a tabela no banco de dados.

## Rotas da API:

| Metódos  | Url           | Descrição                                 |
| :------- | :------------ | :---------------------------------------- |
| `GET`    | `/`           | testa se o servidor está em funcionamento |
| `GET`    | `/dogs`       | retorna todos os cães cadastrados         |
| `GET`    | `/dogs/:uuid` | retorna o cão com uuid correspondente     |
| `POST`   | `/dogs`       | cadastra um cão                           |
| `PUT`    | `/dogs/:uuid` | atualiza um cão                           |
| `DELETE` | `/dogs/:uuid` | apaga o cão com o uuid correspondente     |

## Ferramentas

* [nodejs](https://nodejs.org/en/)
* [express](http://expressjs.com/pt-br/)
* [typescript](https://www.typescriptlang.org/)
* [postegre](https://www.npmjs.com/package/pg)
* [cors](https://www.npmjs.com/package/cors)
* [sequelize](https://sequelize.org/)
* [sequelize-sypescript](https://www.npmjs.com/package/sequelize-typescript)
