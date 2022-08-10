import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASSWORD as string;
const dbName = process.env.DATABASE as string;
const dbDialect = process.env.DB_DIALECT as Dialect;

const connection = new Sequelize(dbName, dbUser, dbPass, {
  dialect: dbDialect,
  host: dbHost,
  logging: false,
  define: {
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default connection;
