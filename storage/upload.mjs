
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'

import { Blob } from 'buffer';


// NFT.Storage API key
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY


function buildURL(address, nonce, childType) {
    let url = `https://ipfs.io/ipfs/QmQUY8AgEh7zsH4DFwa7qg5qpDLw2VeEC1sqsdpYguDFXj?addr=${address}`
    if (nonce != null) {
        url += `&extra=${nonce}`
    }
    if (childType == 2) {
        url += `&circles=1`
    }
    return url;
}

function getJsonBlob(address, url, nonce, childType) {
    let nftType = 'Parent';
    if (nonce) {
        if (childType != 2) {
            childType = 1;
        }
        nftType = `Child Type-${childType}`;
    }

    let obj = {
        "name": `Unrevealed ${nftType} NFT`,
        "description": `Unrevealed ${nftType} NFT!!`,
        "image": url,
        "animation_url": url,
        "attributes": [{
            "trait_type": `Generated For`,
            "value": address
        }, {
            "trait_type": "Created at",
            "value": "ETH San Francisco"
        }]
    }

    // Our child NFTs can have one of two backgrounds and take a nonce seed value
    if (nonce != null) {
        obj.attributes.push({
            "trait_type": "nonce",
            "value": nonce
        })

        // if there's a nonce, it has to be one of the child types
        obj.attributes.push({
            "trait_type": "Child Type",
            "value": childType
        })
    }

    let json_str = JSON.stringify(obj);
    console.log(`DBG: json_str: ${json_str}`)

    return new Blob([json_str], {type: "application/json"})
}

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} address wallet address to mint for
  * @param {string} [nonce] an optional string to seed the background data
  * @param {int} [childType] 1 for square background, 2 for spirals
  */
export async function storeMetadata(address, nonce=null, childType=null) {

    let url = buildURL(address, nonce, childType);
    console.log(`DBG: url: ${url}`)

    let jsonBlob = getJsonBlob(address, url, nonce, childType);

    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    //const cid = await nftstorage.storeBlob(jsonBlob)
    //console.log(`DBG: cid returned: ${cid}`);
    const cid = bafkreif2s3tzkmvtrisyfe3eickqygmqsju3fqb2jzo4f6rzk5w32lslfy
    console.log(`DBG: SUBSTITUTE CONSTANT cid returned: ${cid}`);

    return cid
}

/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeBlob.
 */
async function main() {
    const args = process.argv.slice(2)
    if (args.length < 1 || args.length > 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <name> <description> <address> [nonce] [childType]`)
        process.exit(1)
    }

    let address = args[0];
    let nonce = null;
    let childType = null;

    if (args.length >= 2) {
        nonce = args[1];
    }
    if (args.length >= 3) {
        childType = args[2];
    }

    console.log(`DBG: address: ${address}`);
    console.log(`DBG: nonce: ${nonce}`);
    console.log(`DBG: childType: ${childType}`);

    // the real action
    let cid = await storeMetadata(address, nonce, childType);

    const storageUrl = `https://cloudflare-ipfs.com/ipfs/${cid}`
    console.log(`DBG: check out: ${storageUrl}`);
}

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })