const { ethers, upgrades } = require("hardhat");
const prompt = require("prompt-sync")();
const deployedRecorder = require("../lib/deployedRecorder");

async function main() {
  if(network.name == "mainnet"){
    const promptResponse = prompt("Deploying to mainnet? Type 'DEPLOY' to continue? ");
    if(promptResponse != "DEPLOY"){
      return;
    }
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  //NFT deployment
  const AnchainDrm1155 = await ethers.getContractFactory("AnchainDrm1155");
  const anchaindrm1155 = await AnchainDrm1155.deploy();
  deployedRecorder.recordContractAddress("anchaindrm1155", anchaindrm1155.address);
  console.log("AnchainDrm1155 deployed to:", anchaindrm1155.address);

  //Storefront deployment
  const AnchainDrm1155Storefront = await ethers.getContractFactory("AnchainDrm1155Storefront");
  const anchaindrm1155Storefront = await AnchainDrm1155Storefront.deploy(anchaindrm1155.address);
  deployedRecorder.recordContractAddress("anchaindrm1155Storefront", anchaindrm1155Storefront.address);
  console.log("AnchainDrm1155Storefront deployed to:", anchaindrm1155Storefront.address);

  //Grant storefront NFT storefront role
  const storefrontRoleID = await anchaindrm1155.STOREFRONT_ROLE();
  await anchaindrm1155.grantRole(storefrontRoleID, anchaindrm1155Storefront.address);
  console.log("AnchainDrm1155Storefront granted NFT storefront role");

  //Grant deployer storefront curator role
  const curatorRoleID = await anchaindrm1155Storefront.CURATOR_ROLE();
  await anchaindrm1155Storefront.grantRole(curatorRoleID, deployer.address);
  console.log("Deployer granted storefront curator role");

  console.log("New account balance: ", (await deployer.getBalance()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
