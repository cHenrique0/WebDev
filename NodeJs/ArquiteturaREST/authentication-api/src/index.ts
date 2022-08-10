// Importando o express
import express from "express";
// importando as rotas
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route";
import erroHandler from "./middlewares/error-handdler.middleware";
import authRoute from "./routes/auth.route";
import jwtAuthMiddleware from "./middlewares/jwt-auth.middleware";

// criando uma instância do express
const app = express();
// variavel para armazenar a porta que será usada pelo express
const port = 3000;

/* Configurações da aplicação */
app.use(express.json()); // middleware para o express interpretar o content-type da resquest como json
app.use(express.urlencoded({ extended: true }));

/* Configurações de rotas */
app.use(statusRoute); // rotas de status do servidor
app.use(authRoute);
/* O middleware é usado em todas as rotas que vem depois dele, as anteriores não o usam */
app.use(jwtAuthMiddleware); // middleware para autenticação de usuário
app.use(usersRoute); // rotas do usuário

/* Configurações de middlewares */
app.use(erroHandler); // tratamento de erros

/* Inicialização do servidor */
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
