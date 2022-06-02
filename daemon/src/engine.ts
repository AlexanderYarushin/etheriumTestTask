import {
  FAILED_REQUEST,
  getEtheriumBlock,
  getLastEtheriumBlock,
} from "../../etherium/getBlock";
import { EtheriumBlock, EtheriumTransaction } from "../../etherium/types";
import { getSequelize, getTransactionsModelDefine } from "./db/sequelize";
import { config } from "../../config";

let currentEtheriumBlockTag = 0;
let lastEtheriumBlockTag = 0;

const sequelize = getSequelize();
const blocksTable = getTransactionsModelDefine(sequelize);

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
