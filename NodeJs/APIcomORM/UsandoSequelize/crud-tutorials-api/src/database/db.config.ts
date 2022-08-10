import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private sequelize: Sequelize;

  constructor(
    host?: string,
    user?: string,
    pass?: string,
    db?: string,
    dialect?: string
  ) {
    this.sequelize = new Sequelize({
      host: host,
      username: user,
      password: pass,
      database: db,
      dialect: <Dialect>dialect,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      models: [],
    });
  }

  public addModels(models: any[]): void {
    this.sequelize.addModels(models);
  }

  public async connect(options?: {}): Promise<void> {
    await this.sequelize
      .authenticate()
      .then(() => {
        this.sequelize
          .sync(options)
          .then((conn) => {
            if (conn) {
              console.log(`Connected to '${conn.getDatabaseName()}' database`);
              console.log("Database synced successfully!");
            }
          })
          .catch((error) => {
            console.log(`Failed to sync db: ${error.message}`);
          });
      })
      .catch((error) => {
        console.log(`Failed to connect db: '${error.message}'`);
      });
  }
}
