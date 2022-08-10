import { Optional } from "sequelize";

export interface IngredientAttributes {
  uuid: string;
  name: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // deletedAt?: Date;
}

export interface IngredientInput
  extends Optional<IngredientAttributes, "uuid"> {}

export interface IngredientOutput extends Required<IngredientAttributes> {}
