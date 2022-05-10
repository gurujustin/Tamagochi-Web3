require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.13",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/0dc62080d95a458fbcd7bd0e28a1a95d`,
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: `https://matic-mumbai.chainstacklabs.com`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
