import { Optional } from "sequelize";

export interface RecipeAttributes {
  uuid: string;
  title: string;
  instruction: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
  // deletedAt?: Date;
}

export interface RecipeInput extends Optional<RecipeAttributes, "uuid"> {}

export interface RecipeOutput extends Required<RecipeAttributes> {}
