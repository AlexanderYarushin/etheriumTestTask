import { Sequelize } from "sequelize";
import { config } from "../config";

export const getSequelize = (): Sequelize => {
  const pgConfig = {
    logging: false,
    define: {
      updatedAt: "createdAt",
    },
  };

  return new Sequelize(
    config.postgres.database,
    config.postgres.username,
    config.postgres.password,
    {
      dialect: "postgres",
      host: config.postgres.host,
      ...pgConfig,
    }
  );
};
