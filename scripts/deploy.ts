import { ethers } from 'hardhat';

async function main() {
  const NFTMinter = await ethers.getContractFactory('NFTMinter');
  const nftMinter = await NFTMinter.deploy();
  await nftMinter.deployed();
  console.log(`NFTMinter deployed to: ${nftMinter.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
