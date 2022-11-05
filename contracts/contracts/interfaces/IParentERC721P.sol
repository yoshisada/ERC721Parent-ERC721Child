// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

abstract contract IParentERC721P {
    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public {}

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId) public view returns (string memory) {}
    function updateTokenUri(uint256 id, string memory uri) public {
    }
    function addChildContract(address childContract) public {}
}
