import { QueryInterface, DataTypes } from "sequelize";
module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return await queryInterface.createTable("recipes", {
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
      instruction: {
        type: DataTypes.TEXT,
      },
      author: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        // allowNull: false,
      },
    });
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    return await queryInterface.dropTable("recipes");
  },
};
