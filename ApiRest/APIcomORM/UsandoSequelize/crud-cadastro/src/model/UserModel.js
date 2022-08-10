const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
}

module.exports = User;
