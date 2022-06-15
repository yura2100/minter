import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.1',
  networks: {
    goerli: {
      url: process.env.GOERLI_URL ?? '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  typechain: {
    outDir: './typechain',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY ?? '',
  },
};

export default config;
