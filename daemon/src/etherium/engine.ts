import {
  FAILED_REQUEST,
  getEtheriumBlock,
  getLastEtheriumBlock,
  sleep,
} from "./utils";
import { EtheriumBlock, TransactionInfo } from "./types";
import { getSequelize } from "./sequelize";
import { DataTypes } from "sequelize";
import { config } from "../../../config";

let currentEtheriumBlockTag = 0xe32492;
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
  setInterval(updateLastEtheriumBlock, config.updateLastEtheriumBlockInterval);
  await fillTable();
};

const fillTable = async () => {
  while (true) {
    if (currentEtheriumBlockTag > lastEtheriumBlockTag) {
      await sleep(100);
      continue;
    }

    const block: EtheriumBlock = await getEtheriumBlock(
      currentEtheriumBlockTag
    );

    if (block.message !== FAILED_REQUEST && block.message !== null) {
      const transactions = block.result.transactions;

      for (const transaction of transactions) {
        const _transaction: TransactionInfo = {
          tag: transaction.blockNumber,
          value: parseInt(transaction.value),
        };

        logTransactionInfo(_transaction);

        await addNewBlockDB(_transaction);
      }

      currentEtheriumBlockTag++;
    }
  }
};

const logTransactionInfo = (info: TransactionInfo) => {
  console.log(
    "Add new transaction: Tag: " + info.tag + ", Value: " + info.value
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
