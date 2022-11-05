// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721C/ERC721C.sol";
import "./extensions/child/ERC721URIStorage.sol";
//import "./extensions/child/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract Child1ERC721C is ERC721C, ERC721URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(address a) ERC721C("MyToken", "MTK", a) {
        //console.log(a);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, uint256 tokenId, uint256 tokenIdParent, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId, tokenIdParent);
        _setTokenURI(tokenId, uri);
    }

    function updateTokenUri(uint256 id, string memory uri) public onlyRole(MINTER_ROLE){
        _setTokenURI(id, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721C, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721C, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721C, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}