import { Optional } from "sequelize/types";

export interface IngredientRecipeAttributes {
  uuid: string;
  recipeId: string;
  ingredientId: string;
  createdAt?: Date;
  updatedAt?: Date;
  // deletedAt?: Date;
}

export interface IngredientRecipeInput
  extends Optional<IngredientRecipeAttributes, "uuid"> {}

export interface IngredientRecipeOutput
  extends Required<IngredientRecipeAttributes> {}
