const { Model, DataTypes } = require("sequelize");
const connectionDB = require("../database/connection");

class Task extends Model {}

Task.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connectionDB,
    tableName: "tasks",
    underscored: true,
  }
);

module.exports = Task;
