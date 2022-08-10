import expres, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import indexRouter from "./routes/index.routes";
import { Database } from "./database/db.config";
import tutorialRouter from "./routes/tutorial.routes";
import { Tutorial } from "./models/tutorial.model";

dotenv.config();

const app: Express = expres();
const PORT: number = Number(process.env.APP_PORT) || 8080;
const baseUrl: string = `http://localhost:${PORT}/api`;
const allowedOrigins: string[] = [baseUrl];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

/* App settings */
app.use(cors(corsOptions));
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

/* App routes */
app.use(indexRouter);
app.use(tutorialRouter);

/* Common App middleweres */

/* App database connection */
const db = new Database(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DATABASE,
  process.env.DB_DIALECT
);
db.addModels([Tutorial]);

/* App start */
app.listen(PORT, () => {
  db.connect();
  console.log(`\nApplication is running at: ${baseUrl}`);
});
