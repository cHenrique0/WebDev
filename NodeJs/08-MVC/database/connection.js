const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const database = process.env.DATABASE;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;

const connectionDB = new Sequelize(database, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

connectionDB
  .authenticate()
  .then(() => {
    console.log(`* Database successfully connected`);
  })
  .catch((error) => console.log(error));

module.exports = connectionDB;
