import { DataTypes, Sequelize } from "sequelize";
import { config } from "../../../config";

export const getSequelize = (): Sequelize => {
  const pgConfig = {
    logging: false,
    define: {
      createdAt: "createdat",
      updatedAt: "createdat",
      timestamps: true,
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

export const getTransactionsModelDefine = (sequelize: Sequelize) => {
  return sequelize.define("transactions", {
    block_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    block_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from_addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gas_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nonce: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_addr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_index: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    v: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    r: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
