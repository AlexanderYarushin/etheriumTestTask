export type EtheriumBlock = {
  jsonrpc: string;
  id: number;
  status?: string;
  message?: string;
  result: string & {
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: [EtheriumTransaction];
    transactionsRoot: string;
    uncles: [any];
  };
};

export type EtheriumTransaction = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
};

export type TransactionInfo = {
  tag: string;
  value: number;
};
