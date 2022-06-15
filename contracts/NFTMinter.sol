//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721URIStorage, Ownable {
    uint256 private _tokenId;

    constructor() ERC721("NFTMinter", "MINTER") {}

    function mint(address to, string memory tokenUri) external onlyOwner returns (uint256) {
        ++_tokenId;
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, tokenUri);
        return _tokenId;
    }
}
