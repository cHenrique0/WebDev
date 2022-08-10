import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { TutorialAttributes } from "../interfaces/tutorial.interface";

@Table({
  tableName: "tutorials",
  timestamps: true,
})
export class Tutorial extends Model<TutorialAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare published: boolean;
}
