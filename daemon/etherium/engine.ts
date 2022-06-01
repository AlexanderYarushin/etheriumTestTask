import { FAILED_REQUEST, getLastEtheriumBlock } from "./utils";
import { EtheriumBlock } from "./types";
import { getSequelize } from "./sequelize";
import { DataTypes, Sequelize } from "sequelize";

let currentEtheriumBlockTag = 0x10d4f;
let lastEtheriumBlockTag = 0;

const sequelize = getSequelize();
const blocksTable = sequelize.define("blocks", {
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export const start = async () => {
  //setInterval(updateLastEtheriumBlock, config.updateLastEtheriumBlockInterval);
  await fillDb();
};

const fillDb = async () => {
  await blocksTable.create({ tag: "0x0050502354", value: 4 });
};

const updateLastEtheriumBlock = async () => {
  const block: EtheriumBlock = await getLastEtheriumBlock();

  if (
    block.message !== FAILED_REQUEST &&
    lastEtheriumBlockTag != parseInt(block.result)
  ) {
    lastEtheriumBlockTag = parseInt(block.result);
  }
};
