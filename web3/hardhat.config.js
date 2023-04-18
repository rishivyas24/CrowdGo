/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: "mumbai",
    networks: {
      hardhat: {},
      mumbai: {
        url: "https://rpc.ankr.com/polygon_mumbai",
        accounts: [`${process.env.PRIVATE_KEY}`],
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
