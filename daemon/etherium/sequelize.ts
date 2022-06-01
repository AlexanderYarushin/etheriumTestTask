import { DataTypes, Sequelize } from "sequelize";
import { config } from "../../config";
import { Model, ModelCtor } from "sequelize/types/model";

export const getSequelize = (): Sequelize => {
  const pgConfig = {
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
