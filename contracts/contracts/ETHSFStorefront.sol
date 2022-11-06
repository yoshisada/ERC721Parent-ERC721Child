// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IParentERC721P.sol";
import "./interfaces/IChildERC721C.sol";

contract ETHSFStorefront is AccessControl {
    bytes32 public constant ACCOUNTANT_ROLE = keccak256("ACCOUNTANT_ROLE");
    bytes32 public constant CURATOR_ROLE = keccak256("CURATOR_ROLE");

    address public parentAddress;
    IParentERC721P private parent;
    uint256 public counterParent = 0;
    uint256 public maxParentCount = 10000;

    mapping (address => bool) private _holder;
    mapping (uint256 => bool) private _lockParentURI;

    address public child1Address;
    IChildERC721C private child1;
    uint256 counterChild1 = 0;
    mapping (uint256 => bool) private _lockChild1URI;

    address public child2Address;
    IChildERC721C private child2;
    uint256 counterChild2 = 0;
    mapping (uint256 => bool) private _lockChild2URI;

    bool private _paused = false;
    uint256 price = 0;

    event StorefrontPaused();
    event StorefrontUnpaused();

    event ParentMinted(uint256 id, uint256 price, address owner);

    event ChildMinted(uint256 id, uint256 parentId, uint256 price, address owner);

    constructor(address _parent, address _child1, address _child2) {
        parentAddress = _parent;
        child1Address = _child1;
        child2Address = _child2;
        parent = IParentERC721P(_parent);
        child1 = IChildERC721C(_child1);
        child2 = IChildERC721C(_child2);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }


    function checkSalePaused() public view returns (bool) {
        return _paused;
    }

    function pauseSale() public onlyRole(CURATOR_ROLE) {
        require(!_paused, "Contract is already paused!!");
        _paused = true;
        emit StorefrontPaused();
    }

    function unpauseSale() public onlyRole(CURATOR_ROLE) {
        require(_paused, "Artwork sale not paused");
        _paused = false;
        emit StorefrontUnpaused();
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function updatePrice(uint256 newPrice) public onlyRole(CURATOR_ROLE) {
        price = newPrice;
    }

    function getBalance()
        public
        view
        onlyRole(ACCOUNTANT_ROLE)
        returns (uint256)
    {
        return address(this).balance;
    }

    function withdrawETH(uint256 amount) public onlyRole(ACCOUNTANT_ROLE) {
        address payable to = payable(msg.sender);
        withdrawETHTo(to, amount);
    }

    function withdrawETHTo(address payable to, uint256 amount)
        public
        onlyRole(ACCOUNTANT_ROLE)
    {
        require(amount <= getBalance(), "Insufficent funds");
        to.transfer(amount);
    }

    function mintParent() public payable {
        require(!_paused, "Storefront paused");
        require(msg.value == price, "Wrong price");
        require(counterParent > maxParentCount, "MAX COLLECTION EXCEEDED");
        require(!_holder[msg.sender], "Parent NFT Already held");
        //require(anchaindrm1155Contract.getAvailablePrints(tokenId) > 0, "Artwork sold out");
        //check for max prints here
        //restrict one parent per address

        parent.safeMint(msg.sender, counterParent, "abcdefg");
        emit ParentMinted(counterParent, price, msg.sender);
        _holder[msg.sender] = true;
        _lockParentURI[counterParent] = false;
        counterParent++;
    }

    function mintChild1(uint256 parentId) public payable {
        require(!_paused, "Storefront paused");
        require(msg.value == price, "Wrong price");
        //require(anchaindrm1155Contract.getAvailablePrints(tokenId) > 0, "Artwork sold out");
        //check for max prints here
        //restrict one parent per address

        child1.safeMint(msg.sender, counterChild1, parentId, "abcdefg");
        emit ChildMinted(counterChild1, parentId, price, msg.sender);
        _lockChild1URI[counterChild1] = false;
        counterChild1++;
    }

    function mintChild2(uint256 parentId) public payable {
        require(!_paused, "Storefront paused");
        require(msg.value == price, "Wrong price");
        //require(anchaindrm1155Contract.getAvailablePrints(tokenId) > 0, "Artwork sold out");
        //check for max prints here
        //restrict one parent per address

        child1.safeMint(msg.sender, counterChild2, parentId, "abcdefg");
        emit ChildMinted(counterChild2, parentId, price, msg.sender);
        _lockChild1URI[counterChild2] = false;
        counterChild2++;
    }

    function updateParentURI(uint256 id, string memory uri) public onlyRole(CURATOR_ROLE){
        require(!_lockParentURI[id], "URI Already Updated");
        parent.updateTokenUri(id, uri);
        _lockParentURI[id] = true;
    }

    function updateChild1URI(uint256 id, string memory uri) public onlyRole(CURATOR_ROLE){
        require(!_lockChild1URI[id], "URI Already Updated");
        child1.updateTokenUri(id, uri);
        _lockChild1URI[id] = true;
    }

    function updateChild2URI(uint256 id, string memory uri) public onlyRole(CURATOR_ROLE){
        require(!_lockChild2URI[id], "URI Already Updated");
        child2.updateTokenUri(id, uri);
        _lockChild2URI[id] = true;
    }
}
