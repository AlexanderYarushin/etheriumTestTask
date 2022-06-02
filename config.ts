export const config = {
  //Daemon
  etheriumApiUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=%1&boolean=true&apiKey=F74NG73VMDVYF8R24T3TIUU4NP174SEWGH",
  lastEtheriumBlockUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apiKey=F74NG73VMDVYF8R24T3TIUU4NP174SEWGH",
  updateLastEtheriumBlockInterval: 1000, //ms
  postgres: {
    database: "postgres",
    username: "postgres",
    password: "root",
    host: "localhost",
  },
  offsetFromLastBlock: 20,

  //Api

  apiPort: 3000,
  calcBlockCount: 100,
};
