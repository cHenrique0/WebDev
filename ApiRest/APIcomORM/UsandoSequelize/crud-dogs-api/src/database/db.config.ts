import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  DIALECT: process.env.DIALECT,
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
