import {
  FAILED_REQUEST,
  getEtheriumBlock,
  getLastEtheriumBlock,
  sleep,
} from "../../etherium/getBlock";
import { EtheriumBlock, EtheriumTransaction } from "../../etherium/types";
import { getSequelize } from "./db/sequelize";
import { DataTypes } from "sequelize";
import { config } from "../../config";

let currentEtheriumBlockTag = 0;
let lastEtheriumBlockTag = 0;

const sequelize = getSequelize();
const blocksTable = sequelize.define("transactions", {
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
      const transactions: EtheriumTransaction[] = block.result.transactions;

      logTransactionInfo(block);

      for (const transaction of transactions) {
        await addNewBlockDB(transaction);
      }

      currentEtheriumBlockTag++;
    }
  }
};

const logTransactionInfo = (info: EtheriumBlock) => {
  const online =
    Math.abs(lastEtheriumBlockTag - currentEtheriumBlockTag) < 1
      ? "(online)"
      : "";

  console.log(
    `Add new transactions${online}: Tag: ${info.result.number}, Number of transactions: ${info.result.transactions.length}`
  );
};

const addNewBlockDB = async (data: EtheriumTransaction) => {
  await blocksTable.create({
    block_hash: data.blockHash,
    block_number: data.blockNumber,
    from_addr: data.from,
    gas: data.gas,
    gas_price: data.gasPrice,
    hash: data.hash,
    input: data.input,
    nonce: data.nonce,
    to_addr: data.to,
    transaction_index: data.transactionIndex,
    value: data.value,
    type: data.type,
    v: data.v,
    r: data.r,
    s: data.s,
  });
};

const updateLastEtheriumBlock = async () => {
  console.log("Wait new block...");
  const block: EtheriumBlock = await getLastEtheriumBlock();

  if (
    block.message !== FAILED_REQUEST &&
    lastEtheriumBlockTag != parseInt(block.result)
  ) {
    lastEtheriumBlockTag = parseInt(block.result);
    console.log("New block: " + block.result);
  }
};
