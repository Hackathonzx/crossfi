const { ethers } = require("hardhat");
require('dotenv').config();

const { PRIVATE_KEY, CROSSFI_RPC_URL, XFI_TOKEN_ADDRESS } = process.env

async function main() {
    const [deployer] = await ethers.getSigners();    
    console.log("Deploying contracts with the account:", deployer.address);  
    console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString()); 

    const XFI_TOKEN_ADDRESS = "0xF78391F0992E80959fe3Fe55340270D26C56E3Ae"; // replace with actual address
    const AstroPet = await ethers.getContractFactory("AstroPet");
    const deployTx = await AstroPet.getDeployTransaction(XFI_TOKEN_ADDRESS);
    const estimatedGas = await ethers.provider.estimateGas(deployTx);
    console.log("Estimated gas for AstroPet deployment:", estimatedGas.toString());


    const astroPet = await AstroPet.deploy(XFI_TOKEN_ADDRESS);
    await astroPet.waitForDeployment(); // Updated for ethers v6
    console.log("AstroPet deployed to:", await astroPet.getAddress()); // Updated for ethers v6

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(XFI_TOKEN_ADDRESS, "0x2Fad953E1F524e6590EdF50BDA6FCB391Dd4Fd96");
    await marketplace.waitForDeployment();
    console.log("Marketplace deployed to:", await marketplace.getAddress());
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 