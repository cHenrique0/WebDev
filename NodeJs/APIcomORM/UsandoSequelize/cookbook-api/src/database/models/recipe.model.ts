import { DataTypes, Model } from "sequelize";
import {
  RecipeAttributes,
  RecipeInput,
} from "../../api/interfaces/recipe.interface";
import connection from "../connection";

class Recipe
  extends Model<RecipeAttributes, RecipeInput>
  implements RecipeAttributes
{
  public uuid!: string;
  public title!: string;
  public instruction!: string;
  public author!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // public readonly deletedAt!: Date;
}

Recipe.init(
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
    instruction: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    tableName: "recipes",
    // paranoid: true,
  }
);

export default Recipe;
