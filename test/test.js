const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AstroPet and Marketplace", function () {
    let AstroPet, astroPet, Marketplace, marketplace, xfiToken, owner, addr1, addr2;

    beforeEach(async function () {
        const XFI_TOKEN_ADDRESS = "0xF78391F0992E80959fe3Fe55340270D26C56E3Ae";
        // Get the ContractFactories and Signers
        [owner, addr1, addr2] = await ethers.getSigners();
        
        // Deploy XFI ERC20 Token (Mock token for testing)
        const XFIMock = await ethers.getContractFactory("MockERC20");
        xfiToken = await XFIMock.deploy("XFI Token", "XFI", ethers.parseEther("1000")); // If you are using version 6 so then use ethers.parseEther("") if not downgrade ether to v5
        await xfiToken.waitForDeployment();

        // Deploy AstroPet contract
        AstroPet = await ethers.getContractFactory("AstroPet");
        astroPet = await AstroPet.deploy(XFI_TOKEN_ADDRESS);
        await astroPet.waitForDeployment();

        // Deploy Marketplace contract
        Marketplace = await ethers.getContractFactory("Marketplace");
        marketplace = await Marketplace.deploy(XFI_TOKEN_ADDRESS, astroPet.address);
        await marketplace.waitForDeployment();

        // Distribute some XFI tokens to test accounts
        await xfiToken.transfer(addr1.address, ethers.parseEther("200"));
        await xfiToken.transfer(addr2.address, ethers.parseEther("200"));
    });

    describe("AstroPet Contract", function () {
        it("should mint an AstroPet and deduct XFI from the user", async function () {
            await xfiToken.connect(addr1).approve(astroPet.address, ethers.parseEther("100"));

            await expect(astroPet.connect(addr1).mintAstroPet("Fluffy", "blue", 10, 5))
                .to.emit(astroPet, "AstroPetMinted")
                .withArgs(1, "Fluffy", addr1.address);

            expect(await xfiToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
            expect(await astroPet.ownerOf(1)).to.equal(addr1.address);
        });

        it("should list an AstroPet for sale", async function () {
            await xfiToken.connect(addr1).approve(astroPet.address, ethers.parseEther("100"));
            await astroPet.connect(addr1).mintAstroPet("Fluffy", "blue", 10, 5);

            await astroPet.connect(addr1).listAstroPet(1, ethers.parseEther("50"));
            const price = await astroPet.petPrice(1);

            expect(price).to.equal(ethers.utils.parseEther("50"));
        });

        it("should allow a user to buy an AstroPet", async function () {
            await xfiToken.connect(addr1).approve(astroPet.address, ethers.parseEther("100"));
            await astroPet.connect(addr1).mintAstroPet("Fluffy", "blue", 10, 5);
            await astroPet.connect(addr1).listAstroPet(1, ethers.parseEther("50"));

            await xfiToken.connect(addr2).approve(astroPet.address, ethers.parseEther("50"));
            await expect(astroPet.connect(addr2).buyAstroPet(1))
                .to.emit(astroPet, "AstroPetSold")
                .withArgs(1, addr2.address, ethers.parseEther("50"));

            expect(await astroPet.ownerOf(1)).to.equal(addr2.address);
        });
    });

    describe("Marketplace Contract", function () {
        it("should list an AstroPet on the marketplace", async function () {
            await xfiToken.connect(addr1).approve(astroPet.address, ethers.parseEther("100"));
            await astroPet.connect(addr1).mintAstroPet("Fluffy", "blue", 10, 5);

            await astroPet.connect(addr1).approve(marketplace.address, 1);
            await marketplace.connect(addr1).listItem(1, ethers.parseEther("60"));

            const listing = await marketplace.listings(1);
            expect(listing.seller).to.equal(addr1.address);
            expect(listing.price).to.equal(ethers.parseEther("60"));
        });

        it("should allow a user to buy an AstroPet from the marketplace", async function () {
            await xfiToken.connect(addr1).approve(astroPet.address, ethers.parseEther("100"));
            await astroPet.connect(addr1).mintAstroPet("Fluffy", "blue", 10, 5);
            await astroPet.connect(addr1).approve(marketplace.address, 1);
            await marketplace.connect(addr1).listItem(1, ethers.parseEther("60"));

            await xfiToken.connect(addr2).approve(marketplace.address, ethers.parseEther("60"));
            await expect(marketplace.connect(addr2).buyItem(1))
                .to.emit(marketplace, "ItemSold")
                .withArgs(addr2.address, 1, ethers.parseEther("60"));

            expect(await astroPet.ownerOf(1)).to.equal(addr2.address);
        });
    });
});
