const { Model, DataTypes } = require("sequelize");
const connection = require("../database/connection");
const User = require("./User");

class Address extends Model {}

Address.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      required: true,
    },
    street: {
      type: DataTypes.STRING,
      required: true,
    },
    number: {
      type: DataTypes.STRING,
      required: true,
    },
    city: {
      type: DataTypes.STRING,
      required: true,
    },
    state: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    sequelize: connection,
    tableName: "adresses",
    timestamps: true,
    underscored: true,
  }
);

// Relationship - Address belongs to a User
// Address.belongsTo(User);

module.exports = Address;
