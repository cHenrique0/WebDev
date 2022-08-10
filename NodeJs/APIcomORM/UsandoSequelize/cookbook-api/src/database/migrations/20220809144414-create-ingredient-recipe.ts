import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    return await queryInterface.createTable("ingredients_recipes", {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.UUID,
        references: {
          model: "recipes",
          key: "uuid",
        },
      },
      ingredient_id: {
        type: DataTypes.UUID,
        references: {
          model: "ingredients",
          key: "uuid",
        },
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
    return await queryInterface.dropTable("ingredients_recipes");
  },
};
