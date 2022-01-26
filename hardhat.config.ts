import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@tenderly/hardhat-tenderly";
import dotenv from 'dotenv';
import type { HttpNetworkUserConfig } from "hardhat/types";
import { task } from "hardhat/config";

dotenv.config();
const { INFURA_KEY, MNEMONIC, ETHERSCAN_API_KEY, PK } = process.env;

const DEFAULT_MNEMONIC =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  sharedNetworkConfig.accounts = [PK];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}

task('post', 'Creates a generic “microblog” post with a given content')
  .addParam('content', 'Specify the content of the message to post', undefined)
  .setAction(async ({ content }, hre) => {
    // NB: This is only possible because we know the target address.
    const poster = await hre.ethers.getContractAt("Poster", '0x000000000000cd17345801aa8147b8D3950260FF');
    const tag = "post";
    const post = `{"type":"microblog","text": "${content}"}`;
    const tx = await poster.post(post, tag);
    console.log('Transaction Hash', tx.hash);
  })

module.exports = {
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    mainnet: {
      ...sharedNetworkConfig,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    goerli: {
      ...sharedNetworkConfig,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    },
    kovan: {
      ...sharedNetworkConfig,
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
    },
    rinkeby: {
      ...sharedNetworkConfig,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
    },
    arb1: {
      ...sharedNetworkConfig,
      url: `https://arb1.arbitrum.io/rpc`,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 2000000,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
      version: "0.8.0",
      settings: {
          optimizer: {
            enabled: true,
            runs: 10000000,
          },
        }
    }
};
