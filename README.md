## AstroPet: A Space-Themed NFT Game ##
**Project Vision**
The AstroPet project is a blockchain-based game where players mint, evolve, and trade space-themed NFT pets. These pets, known as AstroPets, possess unique attributes like size, power, and color, and can be leveled up through battles and missions. Players use an ERC20 token (XFI) as in-game currency for minting, upgrading, and trading these AstroPets. The game introduces an interactive and fun ecosystem where players engage in a virtual marketplace to list and buy pets, all governed by smart contracts.

This vision creates a decentralized gaming experience combining NFT collectibles, interactive gameplay, and a marketplace for trading pets. The decentralized aspect allows players to have complete ownership of their AstroPets, with transactions secured and facilitated by smart contracts.

# contracts overview #
1. **AstroPet Contract**
Contract Name: AstroPet
Inherits: ERC721, Ownable
Token Name: AstroPet (APET)
Purpose: This contract manages the minting, ownership, and trading of AstroPets. Each AstroPet is an NFT that can be bought, sold, and traded using the ERC20 XFI token.

 **Key Features:**
- Minting AstroPets: Players can mint a new AstroPet by paying 100 XFI tokens.
Each AstroPet has attributes: name, color, size, power, level, and experience.
Minted pets start at level 1 and can evolve based on their experience and power.

- Trading AstroPets: Players can list their AstroPets for sale by setting a price in XFI.
Other players can purchase listed AstroPets by transferring the set amount of XFI tokens.

- Pet Attributes:
AstroPetAttributes: This structure defines the unique traits of each pet.
   - name: The name of the pet.
   - color: Color of the pet.
   - size: Size of the pet.
   - power: Initial power of the pet.
   - level: Current level of the pet.
   - experience: XP of the pet, which increases as it engages in missions and battles.
   - evolved: A boolean that indicates if the pet has evolved to a new form.

- Events:
AstroPetMinted: Emitted when a new AstroPet is minted.
AstroPetListed: Emitted when an AstroPet is listed for sale.
AstroPetSold: Emitted when an AstroPet is sold.
MissionCompleted: Emitted when a pet completes a mission and gains experience.
BattleWon: Emitted when a pet wins a battle and earns rewards.

- Main Functions:
mintAstroPet: Allows players to mint a new AstroPet by providing attributes like name, color, size, and power. The player must transfer 100 XFI to mint the AstroPet.
listAstroPet: Enables the owner of an AstroPet to list it for sale by specifying a price in XFI.
buyAstroPet: Facilitates the purchase of a listed AstroPet by transferring the required XFI from the buyer to the seller.

2. # Marketplace Contract
Contract Name: Marketplace
Purpose: The Marketplace contract facilitates the trading of AstroPets, allowing players to list and purchase pets using the XFI token.

**Key Features:**
- Listing Items for Sale: Players can list their AstroPets for sale by specifying a price in XFI.
Each listing is mapped to the tokenId of the pet.
- Buying Items: Players can purchase listed AstroPets by transferring the required amount of XFI tokens.
Ownership of the AstroPet is transferred to the buyer, and the listing is deleted after the sale.

- Events:
ItemListed: Emitted when an item is listed for sale.
ItemSold: Emitted when an item is sold.

- Main Functions:
listItem: Allows a player to list an AstroPet for sale by specifying the tokenId and price.
buyItem: Allows a player to purchase a listed AstroPet by transferring the required XFI to the seller and receiving the ownership of the pet.

3. # MockERC20 Contract
Contract Name: MockERC20
Purpose: This contract is a mock implementation of an ERC20 token that represents the XFI token used for transactions within the AstroPet ecosystem.

**Key Features:**
- Initial Supply: The total initial supply of XFI tokens is minted and assigned to the deployer.
- Decimals: The token has 18 decimals, which is standard for ERC20 tokens.

4. # Deployment Script
The deployment script deploys both the AstroPet and Marketplace contracts:
with contract addresses:

- to compile run: npx hardhat compile
- to run test: npx hardhat test
- run: npx hardhat run ignition/modules/deploy.js --network CrossFiTestnet

- Marketplace deployed to: 0x359451AC3C73827A7653C0Ab7D30243844a55447
- AstroPet deployed to: 0x2Fad953E1F524e6590EdF50BDA6FCB391Dd4Fd96

which can be proved by this links:

https://test.xfiscan.com/address/0x359451AC3C73827A7653C0Ab7D30243844a55447

https://test.xfiscan.com/address/0x2Fad953E1F524e6590EdF50BDA6FCB391Dd4Fd96

5. # Game Flow
- Minting AstroPets: Players use XFI tokens to mint new AstroPets with random attributes.
- Trading: Players can list their pets for sale in the marketplace.
Other players can buy listed pets using XFI tokens.
- Battles and Missions: AstroPets gain experience and rewards by participating in in-game activities like battles and missions.

6. # Summary of $XFI Usage:
- Utility Token: $XFI acts as a utility token within the AstroPet ecosystem, facilitating transactions for minting, listing, and purchasing AstroPets.
- Incentivization: The token can also be used to reward players for winning battles or completing missions in future gameplay expansions.

- Key Features:
   - Cross-Compatible: $XFI is implemented using ERC20, ensuring compatibility with various wallets and decentralized applications.
   - Ecosystem-Driven: The token serves as the backbone of the in-game economy, driving engagement and providing value to players.

7. # MVP Features
- AstroPet Contract:
   - Minting: Users can mint new AstroPets by paying a fee in the $XFI token.
   - Attributes: Each AstroPet has defined attributes like name, color, size, power, level, experience, and evolution status.
   - Listing: Users can list their AstroPets for sale at a specified price.

- Marketplace Contract:
   - Listing: Users can list their AstroPets for sale, specifying the price in $XFI tokens.
   - Buying: Other users can purchase listed AstroPets by transferring the specified price to the seller.

- $XFI Token: A mock ERC20 token that users use for transactions within the AstroPet ecosystem.

8. # Proof of MVP
- Smart Contract Code: The source code of the AstroPet, Marketplace, and MockERC20 contracts as shared earlier.
- Deployment Scripts: Scripts used to deploy the contracts to the blockchain.
- Transaction Logs: Any test transactions or deployment logs showing the minting, listing, and buying of AstroPets using $XFI tokens.

9. # Future Improvements:
- Evolution and Customization: Add features for evolving AstroPets into more powerful forms based on their level and experience.
- Rare Items: Implement rare items that can boost the power of AstroPets, adding strategic gameplay elements.
- Cross-chain Support: Integrate cross-chain functionality to allow trading AstroPets on other networks.

10. #  License
This project is licensed under the MIT License. For more details, please refer to the LICENSE file included in the repository.