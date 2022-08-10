import { DataTypes, Model } from "sequelize";
import {
  IngredientAttributes,
  IngredientInput,
} from "../../api/interfaces/ingredient.interface";
import connection from "../connection";

class Ingredient
  extends Model<IngredientAttributes, IngredientInput>
  implements IngredientAttributes
{
  public uuid!: string;
  public name!: string;
  public description!: string;
  public foodGroup!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // public readonly deletedAt!: Date;
}

Ingredient.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    foodGroup: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    tableName: "ingredients",
    // paranoid: true, // create the column delete_at
  }
);

export default Ingredient;
