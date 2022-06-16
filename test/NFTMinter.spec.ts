import { expect } from 'chai';
import { ethers } from 'hardhat';
import { NFTMinter } from '../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('NFTMinter', () => {
  const TOKEN_URI = 'TOKEN_URI';
  const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

  let nftMinter: NFTMinter;
  let signer: SignerWithAddress;

  beforeEach(async () => {
    [, signer] = await ethers.getSigners();
    const NFTMinter = await ethers.getContractFactory('NFTMinter');
    nftMinter = await NFTMinter.deploy();
    await nftMinter.deployed();
  });

  it('should be deployed', () => {
    expect(nftMinter.address).to.be.properAddress;
  });

  it('should return name', async () => {
    const name = await nftMinter.name();
    expect(name).to.equal('NFTMinter');
  });

  it('should return symbol', async () => {
    const symbol = await nftMinter.symbol();
    expect(symbol).to.equal('MINTER');
  });

  it('should mint NFT', async () => {
    await expect(nftMinter.mint(signer.address, TOKEN_URI))
      .to.emit(nftMinter, 'Transfer')
      .withArgs(NULL_ADDRESS, signer.address, 1);
    const owner = await nftMinter.ownerOf(1);
    expect(owner).to.equal(signer.address);
    const tokenURI = await nftMinter.tokenURI(1);
    expect(tokenURI).to.equal(`ipfs://${TOKEN_URI}`);
  });

  it('should not mint NFT, if called by not an owner', async () => {
    await expect(
      nftMinter.connect(signer).mint(signer.address, TOKEN_URI)
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
