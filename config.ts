export const config = {
  etheriumApiUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=%1&boolean=true&apiKey=F74NG73VMDVYF8R24T3TIUU4NP174SEWGH",
  lastEtheriumBlockUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber",
  updateLastEtheriumBlockInterval: 1000, //ms
  addNewEtheriumBlockDBInterval: 1000, //ms
  postgres: {
    database: "etherium",
    username: "postgres",
    password: "root",
    host: "localhost",
  },
};
