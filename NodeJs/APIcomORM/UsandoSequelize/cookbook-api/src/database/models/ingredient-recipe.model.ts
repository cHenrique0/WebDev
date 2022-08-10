import { DataTypes, Model } from "sequelize";
import {
  IngredientRecipeAttributes,
  IngredientRecipeInput,
} from "../../api/interfaces/ingredient-recipe.interface";
import connection from "../connection";
import Ingredient from "./ingredient.model";
import Recipe from "./recipe.model";

class IngredientRecipe
  extends Model<IngredientRecipeAttributes, IngredientRecipeInput>
  implements IngredientRecipeAttributes
{
  public uuid!: string;
  public recipeId!: string;
  public ingredientId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // public readonly deletedAt!: Date;
}

IngredientRecipe.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.UUID,
      references: {
        model: Recipe,
        key: "uuid",
      },
    },
    ingredientId: {
      type: DataTypes.UUID,
      references: {
        model: Ingredient,
        key: "uuid",
      },
    },
  },
  {
    sequelize: connection,
    tableName: "ingredients_recipes",
    // paranoid: true,
  }
);

export default IngredientRecipe;
