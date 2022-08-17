const { Model, DataTypes } = require("sequelize");
const connection = require("../database/connection");

class User extends Model {}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      // allowNull: false,
      required: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      required: true,
    },
    occupation: {
      type: DataTypes.STRING,
      // allowNull: false,
      required: true,
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connection,
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
