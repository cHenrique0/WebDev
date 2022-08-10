import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import DatabaseError from "./errors/database.erro.model";
import { RoleAttributes } from "./interfaces/role.interface";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model<RoleAttributes> {
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
  declare role_name: string;

  @BelongsToMany(() => User, () => UserRole)
  declare users?: User[];

  static async initRoles(): Promise<void> {
    const newRoles = ["admin", "moderator", "user"];
    const existedRoles: string[] = [];

    await this.findAll({ where: { role_name: newRoles } }).then((roles) => {
      roles.forEach((role) => {
        existedRoles.push(role.getDataValue("role_name"));
      });
    });

    newRoles.forEach((newRole) => {
      if (!existedRoles.includes(newRole)) {
        this.create({ role_name: newRole });
      }
    });
  }
}
