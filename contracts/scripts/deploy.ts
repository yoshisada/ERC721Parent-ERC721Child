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
  const ParentERC721P = await ethers.getContractFactory("ParentERC721P");
  const parent = await ParentERC721P.deploy();
  await parent.wait();
  const ChildERC721C = await ethers.getContractFactory("ChildERC721C");
  const child1 = await ChildERC721C.deploy(parent.address);
  const child2 = await ChildERC721C.deploy(parent.address);
  await child1.wait();
  await child2.wait();
  await parent.addChildContract(child1.address);
  await parent.addChildContract(child2.address);
  deployedRecorder.recordContractAddress("parent", parent.address);
  deployedRecorder.recordContractAddress("child1", child1.address);
  deployedRecorder.recordContractAddress("child2", child2.address);
  console.log("Parent deployed to:", parent.address);
  console.log("Child 1 deployed to:", child1.address);
  console.log("Child 2 deployed to:", child1.address);

  //Storefront deployment
  const ETHSFStorefront = await ethers.getContractFactory("ETHSFStorefront");
  const ethsfstorefront = await ETHSFStorefront.deploy(parent.address, child1.address, child2.address);
  deployedRecorder.recordContractAddress("storefront", ethsfstorefront.address);
  console.log("ETHSF Storefront deployed to:", ethsfstorefront.address);

  //Grant storefront NFT storefront role
  const minter = await parent.MINTER_ROLE();
  await parent.grantRole(minter, ethsfstorefront.address);
  console.log("Parent granted Storefront Minter role");

  const minter1 = await child1.MINTER_ROLE();
  await parent.grantRole(child1, ethsfstorefront.address);
  console.log("Child 1 granted Storefront Minter role");

  const minter2 = await child2.MINTER_ROLE();
  await parent.grantRole(child2, ethsfstorefront.address);
  console.log("Child 2 granted Storefront Minter role");

  //Grant deployer storefront curator role
  const curatorRoleID = await ethsfstorefront.CURATOR_ROLE();
  const accountantRoleID = ethsfstorefront.ACCOUNTANT_ROLE()
  await ethsfstorefront.grantRole(curatorRoleID, deployer.address);
  await ethsfstorefront.grantRole(accountantRoleID, deployer.address);
  console.log("Deployer granted storefront curator and accountant role");

  console.log("New account balance: ", (await deployer.getBalance()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
