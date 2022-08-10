import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "dog",
  timestamps: true,
})
export class Dog extends Model<Dog> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight!: number;
}
