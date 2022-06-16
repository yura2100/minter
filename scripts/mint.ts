import { task } from 'hardhat/config';

task('mint', 'Mint NFT')
  .addPositionalParam('contract', 'NFTMinter contract address')
  .addPositionalParam('to', 'Address of recipient')
  .addPositionalParam('tokenURI', 'URI for token metadata')
  .setAction(async ({ contract, to, tokenURI }, { ethers }) => {
    const nftMinter = await ethers.getContractAt('NFTMinter', contract);
    const mintTx = await nftMinter.mint(to, tokenURI);
    await mintTx.wait();
  });
