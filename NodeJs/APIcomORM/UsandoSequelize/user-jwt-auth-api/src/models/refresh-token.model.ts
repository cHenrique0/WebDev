import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import dotenv from "dotenv";
import { RefreshTokenAttributes } from "./interfaces/refresh-token.interface";

dotenv.config();

@Table({
  tableName: "refresh_token",
  timestamps: false,
})
export class RefreshToken extends Model<RefreshTokenAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  declare token: string;

  @Column({
    type: DataType.DATE,
  })
  declare expiryDate: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare user_uuid: string;

  @BelongsTo(() => User)
  declare user?: User;
}
