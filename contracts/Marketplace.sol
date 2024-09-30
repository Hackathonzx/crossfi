// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    IERC20 public xfiToken;
    IERC721 public astroPetToken;

    event ItemListed(address seller, uint256 tokenId, uint256 price);
    event ItemSold(address buyer, uint256 tokenId, uint256 price);

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;

    constructor(address _xfiToken, address _astroPetToken) {
        xfiToken = IERC20(_xfiToken);
        astroPetToken = IERC721(_astroPetToken);
    }

    function listItem(uint256 tokenId, uint256 price) external {
        require(astroPetToken.ownerOf(tokenId) == msg.sender, "You do not own this AstroPet");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing(msg.sender, price);
        emit ItemListed(msg.sender, tokenId, price);
    }

    function buyItem(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.price > 0, "Item not listed");
        require(xfiToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        astroPetToken.safeTransferFrom(listing.seller, msg.sender, tokenId);
        delete listings[tokenId]; // Remove listing after sale

        emit ItemSold(msg.sender, tokenId, listing.price);
    }
}
