export const config = {
  etheriumApiUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=%1&boolean=true ",
  lastEtheriumBlockUrl:
    "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber",
  updateLastEtheriumBlockInterval: 1000, //ms
  postgres: {
    database: "etherium",
    username: "postgres",
    password: "root",
    host: "localhost",
  },
};
