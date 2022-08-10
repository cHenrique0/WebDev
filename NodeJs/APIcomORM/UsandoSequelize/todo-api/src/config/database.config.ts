import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = String(process.env.DATABASE);
const user = String(process.env.DB_USER);
const password = String(process.env.DB_PASSWORD);
const host = String(process.env.DB_HOST);
const dialect = <Dialect>process.env.DB_DIALECT;

const database = new Sequelize(dbName, user, password, {
  host: host,
  dialect: dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default database;
