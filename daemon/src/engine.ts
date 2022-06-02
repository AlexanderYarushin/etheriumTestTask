import {
  FAILED_REQUEST,
  getEtheriumBlock,
  getLastEtheriumBlock,
  sleep,
} from "../../etherium/utils";
import { EtheriumBlock, TransactionInfo } from "../../etherium/types";
import { getSequelize } from "./db/sequelize";
import { DataTypes } from "sequelize";
import { config } from "../../config";

let currentEtheriumBlockTag = 0;
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
  currentEtheriumBlockTag =
    parseInt((await getLastEtheriumBlock()).result) -
    config.offsetFromLastBlock;

  await updateLastEtheriumBlock();

  await fillTable();
};

const fillTable = async () => {
  while (true) {
    if (currentEtheriumBlockTag > lastEtheriumBlockTag) {
      await updateLastEtheriumBlock();
      continue;
    }

    const block: EtheriumBlock = await getEtheriumBlock(
      currentEtheriumBlockTag
    );

    if (block.message !== FAILED_REQUEST) {
      const transactions = block.result.transactions;

      for (const transaction of transactions) {
        const partTransaction: TransactionInfo = {
          tag: transaction.blockNumber,
          value: parseInt(transaction.value),
        };

        logTransactionInfo(partTransaction);

        await addNewBlockDB(partTransaction);
      }

      currentEtheriumBlockTag++;
    }
  }
};

const logTransactionInfo = (info: TransactionInfo) => {
  const online =
    Math.abs(lastEtheriumBlockTag - currentEtheriumBlockTag) <= 1
      ? "(online)"
      : "";

  console.log(
    `Add new transaction${online}: Tag: ${info.tag}, Value: ${info.value}`
  );
};

const addNewBlockDB = async (data: TransactionInfo) => {
  await blocksTable.create(data);
};

const updateLastEtheriumBlock = async () => {
  const block: EtheriumBlock = await getLastEtheriumBlock();

  if (
    block.message !== FAILED_REQUEST &&
    lastEtheriumBlockTag != parseInt(block.result)
  ) {
    lastEtheriumBlockTag = parseInt(block.result);
    console.log("Current tag: " + lastEtheriumBlockTag);
  }
};
