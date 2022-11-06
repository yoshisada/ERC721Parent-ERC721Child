import { gql } from '@apollo/client'
import { lstat } from 'fs/promises'
import client from '../apollo-client'
export const useBackendAPI = () => {
  const fetchParentNFT = async () => {
    const { data } = await client.query({
      query: gql`
        query {
          parentMinteds {
            id
            owner
            childId
          }
        }
      `,
    })

    return data
  }

  const fetchParentChild = async (parent: number) => {
    const { data } = await client.query({
      query: gql`
        query {
          parentMinteds {
            id
            childId
            price
            owner
            contractAddress
          }
          childMinteds {
            id
            childId
            parentId
            price
            contractAddress
          }
          transfers {
            id
            from
            to
            tokenId
          }
          uriupdateds {
            uri
            nftId
            contractAddress
          }
        }
      `,
    })
    console.log(data);
    const relation = {
      parent: null,
      children: {},
      owner: null,
      parentUri: null,
    }

    for(let i = 0; i < data.parentMinteds.length; i++){
      if(data.parentMinteds[i].childId == parent ){
        relation.parent = parent
        relation.owner = data.parentMinteds[i].owner
      }
    }

    if(relation.parent == null){
      return "ERROR: No parent found with that ID"
    }

    for(let i = 0; i < data.childMinteds.length; i++){
      if(data.childMinteds[i].parentId == parent ){
        if (relation.children[data.childMinteds[i].contractAddress] != null){
          relation.children[data.childMinteds[i].contractAddress].push({id:data.childMinteds[i].childId, uri: null})
        }else{
          relation.children[data.childMinteds[i].contractAddress]=[{id:data.childMinteds[i].childId, uri: null}]
        }
      }
    }

    for(let i = 0; i < data.transfers.length; i++){
      if(data.transfers[i].tokenId == parent ){
        relation.owner = data.transfers[i].to
      }
    }

    //contract addresses need to be queried in the relational.children and if its not then its a parent contract

    for(let i = 0; i < data.uriupdateds.length; i++){
      if(data.uriupdateds[i].nftId == parent ){
        if(!Object.values(relation.children).includes(data.uriupdateds[i].contractAddress)){
          relation.parentUri = data.uriupdateds[i].uri
        }
      }
      if(relation.children[data.uriupdateds[i].contractAddress] == null){
        continue
      }
      for(let j = 0; j < relation.children[data.uriupdateds[i].contractAddress].length; j++){
        if(relation.children[data.uriupdateds[i].contractAddress][j].id == data.uriupdateds[i].nftId){
          relation.children[data.uriupdateds[i].contractAddress][j].uri = data.uriupdateds[i].uri
        }
      }
    }

    return relation
  }

  const fetchNFTCollection = async (address: string, callback: Function) => {
    try {
      const nftCollection = await fetch(`/api/collection/${address}`)
      const collectionJSON = await nftCollection.json()
      callback(collectionJSON)
    } catch (error) {
      console.error(error)
      callback({})
    }
  }

  const fetchCollectionOwners = async (address: string, callback: Function) => {
    try {
      const collectionOwners = await fetch(`/api/collection_owners/${address}`)
      const collectionOwnersJSON = await collectionOwners.json()
      callback(collectionOwnersJSON)
    } catch (error) {
      console.error(error)
      callback({})
    }
  }

  const fetchPrice = async (tokenId: string, callback: Function) => {
    const priceResult = await fetch(`/api/contract/getPrice/${tokenId}`)
    const price = await priceResult.text()
    callback(price)
  }

  const checkSoldOut = async (tokenId: string) => {
    const availableResult = await fetch(`/api/contract/getAvailable/${tokenId}`)
    const available = await availableResult.text()
    return parseInt(available) == 0
  }

  const fetchStorefrontBalance = async (callback: Function) => {
    const balanceResult = await fetch(`/api/contract/getStorefrontBalance`)
    const balance = await balanceResult.text()
    callback(balance)
  }

  const fetchAccountBalance = async (address: string, callback: Function) => {
    const balanceResult = await fetch(`/api/contract/getUserBalance/${address}`)
    const balance = await balanceResult.text()
    callback(balance)
  }

  const checkAccountant = async (address: string, callback: Function) => {
    const checkAccountantResult = await fetch(
      `/api/contract/checkAccountant/${address}`,
    )
    const checkAccountant = await checkAccountantResult.text()
    callback(checkAccountant)
  }

  return {
    fetchParentNFT,
    fetchParentChild,
    fetchNFTCollection,
    fetchCollectionOwners,
    fetchPrice,
    checkSoldOut,
    fetchStorefrontBalance,
    fetchAccountBalance,
    checkAccountant,
  }
}
