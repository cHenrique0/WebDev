import {
  BelongsToMany,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { UserAttributes } from "./interfaces/user.interface";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<UserAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles?: Role[];

  @HasOne(() => RefreshToken)
  refresh_token?: RefreshToken;
}
