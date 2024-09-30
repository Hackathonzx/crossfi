// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AstroPet is ERC721, Ownable {
    struct AstroPetAttributes {
        string name;
        string color;
        uint256 size;
        uint256 power;
        uint256 level;
        uint256 experience;
        bool evolved;
    }

    struct RareItem {
        string name;
        uint256 powerBoost;
    }

    mapping(uint256 => AstroPetAttributes) public astroPets;
    mapping(uint256 => RareItem) public rareItems;
    mapping(uint256 => uint256) public petPrice; // Price for each AstroPet

    uint256 public totalSupply;
    IERC20 public xfiToken;

    event AstroPetMinted(uint256 tokenId, string name, address owner);
    event MissionCompleted(uint256 tokenId, uint256 experienceEarned);
    event BattleWon(uint256 tokenId, uint256 reward);
    event AstroPetListed(uint256 tokenId, uint256 price);
    event AstroPetSold(uint256 tokenId, address buyer, uint256 price);

     constructor(address _xfiToken) ERC721("AstroPet", "APET") Ownable(msg.sender) {
        xfiToken = IERC20(_xfiToken);
    }

    function mintAstroPet(string memory name, string memory color, uint256 size, uint256 power) external {
        uint256 tokenId = totalSupply + 1;
        require(xfiToken.transferFrom(msg.sender, address(this), 100 * 10 ** 18), "XFI transfer failed");

        astroPets[tokenId] = AstroPetAttributes(name, color, size, power, 1, 0, false);
        _mint(msg.sender, tokenId);
        totalSupply++;

        emit AstroPetMinted(tokenId, name, msg.sender);
    }

    // Existing functions for missions and battles...

    // Function to list AstroPet for sale
    function listAstroPet(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "You do not own this AstroPet");
        require(price > 0, "Price must be greater than zero");
        
        petPrice[tokenId] = price;
        emit AstroPetListed(tokenId, price);
    }

    // Function to buy AstroPet
    function buyAstroPet(uint256 tokenId) external {
        uint256 price = petPrice[tokenId];
        require(price > 0, "This AstroPet is not for sale");
        require(xfiToken.transferFrom(msg.sender, ownerOf(tokenId), price), "XFI transfer failed");

        _transfer(ownerOf(tokenId), msg.sender, tokenId);
        petPrice[tokenId] = 0; // Remove price after sale
        emit AstroPetSold(tokenId, msg.sender, price);
    }
}
