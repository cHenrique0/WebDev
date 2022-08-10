const Sequelize = require("sequelize");
const configDB = require("../config/dbConfig");

const User = require("../model/UserModel");

const connection = new Sequelize(configDB);

// Inicializando o model
User.init(connection);

module.exports = connection;
