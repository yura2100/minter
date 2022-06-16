//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721URIStorage, Ownable {
    uint256 private _tokenId;

    constructor() ERC721("NFTMinter", "MINTER") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function mint(address to, string memory tokenURI) external onlyOwner returns (uint256) {
        ++_tokenId;
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, tokenURI);
        return _tokenId;
    }
}
