// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

abstract contract IChildERC721C {
    function safeMint(
        address to,
        uint256 tokenId,
        uint256 tokenIdParent,
        string memory uri
    ) public {}
    function updateTokenUri(uint256 id, string memory uri) public {
    }
    function tokenURI(uint256 tokenId) public view returns (string memory) {}
}
