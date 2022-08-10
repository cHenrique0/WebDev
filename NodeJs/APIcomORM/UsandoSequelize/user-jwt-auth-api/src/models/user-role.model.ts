import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { UserRoleAttributes } from "./interfaces/user-role.interface";
import { Role } from "./role.model";
import { User } from "./user.model";

@Table({
  tableName: "user_role",
  timestamps: true,
})
export class UserRole extends Model<UserRoleAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare uuid: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare user_uuid: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role_uuid: string;
}
