
require("dotenv").config();

const { storeMetadata } = require("./upload.js");

//console.log(`DBG: MUMBAI_RPC: ${process.env.MUMBAI_RPC}`)
//console.log(`DBG: STOREFRONT_ADDRESS: ${process.env.STOREFRONT_ADDRESS}`)

const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC);
let signer = new ethers.Wallet(process.env.CURATOR_PRIV_KEY, provider);


const { storefrontABI } = require('./abis/storefront.abi.js');
const storefrontAddress = process.env.STOREFRONT_ADDRESS;

//const Web3 = require('web3');
//let web3 = new Web3(new Web3.providers.HttpProvider(process.env.MUMBAI_RPC));
//const storefrontContract = new web3.eth.Contract(storefrontABI, storefrontAddress);

let storefrontWrite = new ethers.Contract(storefrontAddress, storefrontABI, signer);
let storefrontRead = new ethers.Contract(storefrontAddress, storefrontABI, provider);

const express = require("express");
const app = express();
const expressPort = process.env.APP_PORT ?? 3001;


app.get("/parent/:ownerAddress/:tokenId", async (request, response) => {
    try{
        const ownerAddress = request.params.ownerAddress;
        if (!ethers.utils.isAddress(ownerAddress)) {
            throw(`Not a valid address: "${ownerAddress}"`)
        }

        const tokenId = request.params.tokenId;
        if (tokenId == null || tokenId == undefined) {
            throw(`tokenId must be populated: "${tokenId}"`);
        }

        let cid = await storeMetadata(ownerAddress, tokenId, null);
        const metadataIpfsUrl = `https://cloudflare-ipfs.com/ipfs/${cid}`
        console.log(`updateParentURI(${tokenId}, ${metadataIpfsUrl}`);

        storefrontWrite.updateParentURI(tokenId, metadataIpfsUrl).then((result) => {
            console.log(result);
            console.log('DBG: Done updating parent');
        })

        response.send(true);
    }
    catch(error){
        console.error(error);
        response.status(500).send({
            message: "Error getting parent NFT"
        });
    }
});

app.get("/child/:ownerAddress/:childType/:tokenId", async (request, response) => {
    try{
        const ownerAddress = request.params.ownerAddress;
        if (!ethers.utils.isAddress(ownerAddress)) {
            throw(`Not a valid address: "${ownerAddress}"`)
        }

        const tokenId = request.params.tokenId;
        if (tokenId == null || tokenId == undefined) {
            throw(`tokenId must be populated: "${tokenId}"`);
        }

        const childType = request.params.childType;
        if ((childType != 1) && (childType != 2)) {
            throw(`childType not 1 or 2: "${childType}"`)
        }

        // use the tokenId as the nonce for simplicity
        let cid = await storeMetadata(ownerAddress, tokenId, childType);
        const metadataIpfsUrl = `https://cloudflare-ipfs.com/ipfs/${cid}`

        if (childType == 1) {
            console.log(`updateChild1URI(${tokenId}, ${metadataIpfsUrl}`);
            storefrontWrite.updateChild1URI(tokenId, metadataIpfsUrl).then((result) => {
                console.log(result);
                console.log('DBG: Done updating child');
            })
        }
        else {  // if (childType == 2)
            console.log(`updateChild2URI(${tokenId}, ${metadataIpfsUrl}`);
            storefrontWrite.updateChild1URI(tokenId, metadataIpfsUrl).then((result) => {
                console.log(result);
                console.log('DBG: Done updating child');
            })
        }

        response.send(true);
    }
    catch(error){
        console.error(error);
        response.status(500).send({
            message: "Error getting parent NFT"
        });
    }
});


app.listen(expressPort, () => console.log(`Express test app listening on port ${expressPort}`));