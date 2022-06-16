import * as fs from 'fs/promises';
import { task } from 'hardhat/config';
import Pinata from '@pinata/sdk';

const ipfsPath = (ipfsHash: string) => `ipfs://${ipfsHash}`;

task('ipfs-upload')
  .addPositionalParam('name', 'NFT name')
  .addPositionalParam('description', 'NFT description')
  .addPositionalParam('imagePath', 'Path to uploaded image')
  .setAction(async ({ name, description, imagePath }) => {
    try {
      await fs.access(imagePath);
    } catch (err) {
      console.log('Can not access file');
      process.exit(1);
    }

    const apiKey = process.env.PINATA_API_KEY ?? '';
    const secretApiKey = process.env.PINATA_SECRET_API_KEY ?? '';
    const pinata = Pinata(apiKey, secretApiKey);
    const pinFileResponse = await pinata.pinFromFS(imagePath);
    const metadata = {
      name,
      description,
      image: ipfsPath(pinFileResponse.IpfsHash),
    };
    const pinMetadataResponse = await pinata.pinJSONToIPFS(metadata);
    console.log(
      `Metdata uploaded to: ${ipfsPath(pinMetadataResponse.IpfsHash)}`
    );
  });
