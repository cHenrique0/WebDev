import express, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import indexRouter from "./routes/index.routes";
import roleRouter from "./routes/role.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import { erroHandler } from "./middlewares/error-handdler.middleware";
import { Database } from "./database/db.config";
import { User } from "./models/user.model";
import { Role } from "./models/role.model";
import { UserRole } from "./models/user-role.model";
import { RefreshToken } from "./models/refresh-token.model";

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.APP_PORT) || 8080;
const baseUrl: string = `http://localhost:${PORT}`;
const allowedOrigins: string[] = [baseUrl];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

/* App settings */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* App Routes */
app.use(indexRouter);
app.use(roleRouter); // USAR DOCKER PARA INICIAR OS ROLES
app.use(authRouter);
app.use(userRouter);

/* Common App Middleware */
app.use(erroHandler);

/* App database connection */
const db = new Database(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DATABASE,
  process.env.DB_DIALECT
);
db.addModels([User, Role, UserRole, RefreshToken]);

/* App start */
app.listen(PORT, () => {
  db.connect();
  Role.initRoles();
  console.log(`\nApplication is running at: ${baseUrl}`);
});
