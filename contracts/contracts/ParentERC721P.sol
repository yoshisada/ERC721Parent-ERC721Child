// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721P.sol";
import "./extensions/ERC721URIStorage.sol";
import "./extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC721P, ERC721URIStorage, ERC721Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721P("MyToken", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721P, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721P, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721P, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}