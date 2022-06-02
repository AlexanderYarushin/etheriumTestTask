import Web3 from "web3";
import {
  FAILED_REQUEST,
  getEtheriumBlock,
  getLastEtheriumBlock,
} from "../../etherium/getBlock";
import { EtheriumBlock } from "../../etherium/types";
import { config } from "../../config";

export const getAddressValueMap = async () => {
  const lastBlockTag = parseInt((await getLastEtheriumBlock()).result);
  let currentBlockTag = lastBlockTag - config.calcBlockCount;

  let addresses = new Map<string, number>();

  const promises = [];
  for (; currentBlockTag < lastBlockTag; currentBlockTag++) {
    promises.push(getEtheriumBlock(currentBlockTag));
  }

  const result: EtheriumBlock[] = await Promise.all(promises);

  for (let i = 0; i < result.length; ++i) {
    if(result[i].message !== FAILED_REQUEST){
      result[i].result.transactions.forEach((transaction) => {
        const value = parseFloat(Web3.utils.fromWei(transaction.value));

        if (addresses.get(transaction.from) === undefined) {
          addresses.set(transaction.from, 0);
        }

        addresses.set(transaction.from, addresses.get(transaction.from) - value);

        if (addresses.get(transaction.to) === undefined) {
          addresses.set(transaction.to, 0);
        }

        addresses.set(transaction.to, addresses.get(transaction.to) + value);
      });
    }
  }

  return addresses;
};
