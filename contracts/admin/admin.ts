const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")();
const deployedRecorder = require("../lib/deployedRecorder");
//const manifestReader = require("../lib/manifestReader");

require("dotenv").config();
const storefront = deployedRecorder.retrieveContractAddress("storefront");
const storefrontAbi = require("./abis/storefront.json");

const parent = deployedRecorder.retrieveContractAddress("parent");
const parentAbi = require("./abis/parent.json");

const child1 = deployedRecorder.retrieveContractAddress("child1");
const child1Abi = require("./abis/child.json");

const child2 = deployedRecorder.retrieveContractAddress("child2");
const child2Abi = require("./abis/child.json");

const uploadsFolder = __basedir+"/admin/uploads/";

const IPFSGateway = "https://ipfs.io/ipfs/";

const s3BucketName = "nft.anchaindrm";

const moralisServerURL = process.env.MORALIS_SERVER_URL;
const moralisAppID = process.env.MORALIS_APP_ID;
const moralisMasterKey = process.env.MORALIS_MASTER_KEY;

const mainnetCheck = () => {
  if(network.name == "mainnet"){
    const promptResponse = prompt("Running command on mainnet? Type 'RUN' to continue? ");
    if(promptResponse != "RUN"){
      process.exit(0);
    }
  }
};

const determineDataType = (fileName) => {
  let dataType = "";
  let fileExtension = fileName.split('.').pop();
  fileExtension == 'jpg' ? fileExtension = 'jpeg' : null;
  if(['h264', 'mp4', 'mpeg', 'ogg', 'raw'].includes(fileExtension)){
    dataType = `video/${fileExtension}`;
  }
  else if(['bmp', 'gif', 'jpeg', 'png', 'tiff'].includes(fileExtension)){
    dataType = `image/${fileExtension}`;
  }
  else if(['json'].includes(fileExtension)){
    dataType = `application/${fileExtension}`;
  }
  else{
    throw new Error("Unsupported file extension");
  }
  return dataType;
};


const getContractURI = async () => {
  //Initialize contracts
  const deployer = await hre.ethers.getSigner();
  const anchaindrmNFTContract = new hre.ethers.Contract(anchaindrmNFTAddress, anchaindrmNFTConfig['abi'], deployer);
  const contractURI = await anchaindrmNFTContract.contractURI();
  console.log(`Contract URI: ${contractURI}`);
}

const updateBaseURI = async (newBaseURI) => {
  //Initialize contracts
  const deployer = await hre.ethers.getSigner();
  const anchaindrmNFTContract = new hre.ethers.Contract(anchaindrmNFTAddress, anchaindrmNFTConfig['abi'], deployer);
  const uriUpdateTx = await anchaindrmNFTContract.updateBaseURI(newBaseURI);
  console.log(`Base URI updated`);
  console.log(uriUpdateTx);
}


const unpauseArtworkSale = async (tokenId) => {
  //Initialize contracts
  const deployer = await hre.ethers.getSigner();
  const anchaindrmStorefrontContract = new hre.ethers.Contract(anchaindrmStorefrontAddress, anchaindrmStorefrontConfig['abi'], deployer);
  const artUnpauseTx = await anchaindrmStorefrontContract.unpauseSale(tokenId);
  const artUnpauseResults = await artUnpauseTx.wait();
  console.log(artUnpauseResults.events[0].event);
}

const maxPriorityFeePerGas = hre.ethers.BigNumber.from(50000000000);
  const maxFeePerGas = hre.ethers.BigNumber.from(50000000100);
  const params = {
    //from: deployer.address,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
    maxFeePerGas: maxFeePerGas
  }
const mintParent = async () => {
  const deployer = await hre.ethers.getSigner();
  console.log("Deployer account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const storefrontContract = new hre.ethers.Contract(storefront, storefrontAbi, deployer);
  const mintTx = await storefrontContract.mintParent({value: String(0)});
  console.log(mintTx);
  await mintTx.wait();
}

const mintChild1 = async () => {
  const deployer = await hre.ethers.getSigner();
  console.log("Deployer account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const storefrontContract = new hre.ethers.Contract(storefront, storefrontAbi, deployer);
  const mintTx = await storefrontContract.mintChild1(0, {value: String(0)});
  console.log(mintTx);
  await mintTx.wait();
}

const mintChild2 = async () => {
  const deployer = await hre.ethers.getSigner();
  console.log("Deployer account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const storefrontContract = new hre.ethers.Contract(storefront, storefrontAbi, deployer);
  const mintTx = await storefrontContract.mintChild2(0, {value: String(0)});
  console.log(mintTx);
  await mintTx.wait();
}

const updateParentURI = async () => {
  const deployer = await hre.ethers.getSigner();
  console.log("Deployer account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const storefrontContract = new hre.ethers.Contract(storefront, storefrontAbi, deployer);
  const mintTx = await storefrontContract.updateParentURI(0, "bafkreif2s3tzkmvtrisyfe3eickqygmqsju3fqb2jzo4f6rzk5w32lslfy");
  console.log(mintTx);
  await mintTx.wait();
}

//Main
mainnetCheck();
console.log("Storefront Contract Address: "+storefront);
console.log("Parent Contract Address: "+parent);
console.log("Child1 Contract Address: "+child1);
console.log("Child2 Contract Address: "+child2);

//mintParent();
//mintChild1();
//mintChild2();
updateParentURI();

//const imageFileData = fs.readFileSync(uploadsFolder+"test.jpg");
//uploadToIPFS(imageFileData, "test.jpg", "image/jpg");
//console.log(uploadToIPFS(imageFileData, "test.jpg", "image/jpg"))
//addArtworkManifestToStorefront(false);
//getAllArtworkFromStorefront();
//removeArtworkFromStorefront(1);
//unpauseArtworkSale(4);
//unpauseArtworkSale(5);
//unpauseArtworkSale(6);
//unpauseArtworkSale(7);
//unpauseArtworkSale(4);
//pauseArtworkSale(4);
//grantDeployerStorefrontRole();
//mintTokenTo(3, "0xfB2ca96DE846a0B3C10CA7c0bb6c3Dc0a92c227F");
//mintTokenTo(3, "0xd1c36cBE0c39594e93B99396b00c7421B9bDf5B7");
//mintTokenTo(4, "0x371c56Bab895B7FBd7Cd377B4C2943e717B06a9f");
//mintTokenTo(4, "0x1eB3D2655753f5AFaA30DeAD6A55D06E17C7D029");
