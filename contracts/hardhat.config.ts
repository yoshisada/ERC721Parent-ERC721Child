//require("@rumblefishdev/hardhat-kms-signer");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("hardhat-gas-reporter");
require("dotenv").config();

global.__basedir = __dirname;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ALCHEMY_RINKEBY_RPC_URL = process.env.ALCHEMY_RINKEBY_RPC_URL;
const ALCHEMY_MAINNET_RPC_URL = process.env.ALCHEMY_MAINNET_RPC_URL;
const KMS_STAGING_KEY_ID = process.env.KMS_STAGING_KEY_ID;
const KMS_PRODUCTION_KEY_ID = process.env.KMS_PRODUCTION_KEY_ID;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const ALCHEMY_API_KEY = "E7LffLQgaxnuE9kaZmPZ-7-4XKcGQPHz";


module.exports = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: `${ALCHEMY_MAINNET_RPC_URL}`,
      kmsKeyId: KMS_PRODUCTION_KEY_ID
    },
    rinkeby: {
      url: `${ALCHEMY_RINKEBY_RPC_URL}`,
      kmsKeyId: KMS_STAGING_KEY_ID
    },
    hardhat: {
      allowUnlimitedContractSize: false
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: 'USD',
//    gasPrice: 25
  }
};