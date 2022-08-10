import { DataTypes, Model } from "sequelize";
import database from "../config/database.config";
import { TodoAttributes } from "../interfaces/todo.attributes";

export class Todo extends Model<TodoAttributes> {}

Todo.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "todos",
  }
);
