# Tutorials CRUD API

Essa API é um exemplo feito com a intenção de estudar sobre CRUD usando Node e TypeScript, aleḿ de conceitos sobre APIs e metodos HTTP.  
A API usa Express como web server, Sequelize como ORM e PostgreSQL para persitência de dados, além de outras [ferramentas](#ferramentas).  

## Rotas
| Methods  | Urls                       | Actions                                       |
| :------- | :------------------------- | :-------------------------------------------- |
| `GET`    | `api/tutorials`            | retorna todos os tutoriais                    |
| `GET`    | `api/tutorials/:id`        | retorna um tutorial por ID                    |
| `POST`   | `api/tutorials`            | adiciona um novo tutorial                     |
| `PUT`    | `api/tutorials/:id`        | atualiza um tutorial por ID                   |
| `DELETE` | `api/tutorials/:id`        | deleta um tutorial por ID                     |
| `DELETE` | `api/tutorials`            | deleta todos os tutoriais                     |
| `GET`    | `api/tutorials/published`  | retorna todos os tutoriais publicados         |
| `GET`    | `api/tutorials?title=[kw]` | retorna todos os tutoriais que contenham 'kw' |

## Pagination

| Methods | Urls                                     |
| :------ | :--------------------------------------- |
| `GET`   | `api/tutorials?page=X&size=Y`            |
| `GET`   | `api/tutorials?size=Y`                   |
| `GET`   | `api/tutorials?title=[kw]&page=X&size=Y` |
| `GET`   | `api/tutorials/published?page=X`         |

> X e Y são número que indicam a paginação.
> Por padrão page=0 e size=3

## Ferramentas

* [Nodejs](https://nodejs.org/en/)
* [Express](http://expressjs.com/pt-br/)
* [Typescript](https://www.typescriptlang.org/)
* [Postegre](https://www.npmjs.com/package/pg)
* [Cors](https://www.npmjs.com/package/cors)
* [Sequelize](https://sequelize.org/)
* [sequelize-sypescript](https://www.npmjs.com/package/sequelize-typescript)
