import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import { Dog } from "../models/dog.model";
import { dbConfig } from "./db.config";

export const connection = new Sequelize({
  dialect: <Dialect>dbConfig.DIALECT,
  host: dbConfig.HOST,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  logging: false,
  pool: dbConfig.POOL,
  models: [Dog],
});
