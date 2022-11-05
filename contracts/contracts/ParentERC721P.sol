// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721P/ERC721P.sol";
import "./extensions/parent/ERC721URIStorage.sol";
import "./extensions/parent/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ParentERC721P is ERC721P, ERC721URIStorage, ERC721Burnable, AccessControl {
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

    function updateTokenUri(uint256 id, string memory uri) public onlyRole(MINTER_ROLE){
        _setTokenURI(id, uri);
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

    function addChildContract(address childContract) public onlyRole(DEFAULT_ADMIN_ROLE){
        _addChildContract(childContract);
    }
}