## NFTMimter

### Local development

Install dependencies

`npm ci`

Copy enviroment variables

`cp .env.example .env`

### CLI scripts

**Clean**

`npx hardhat clean`

**Test**

`npx hardhat test`

**Compile**

`npx hardhat compile`

**Deploy**

`npx hardhat run scripts/deploy.ts --network goerli`

**Verify on Etherscan**

`npx hardhat verify --network goerli <CONTRACT ADDRESS> <...args>`

**Mint NFT**

`npx hadhat mint --network goerli <CONTRACT ADDRESS> <TO ADDRESS> <TOKEN URI>`
