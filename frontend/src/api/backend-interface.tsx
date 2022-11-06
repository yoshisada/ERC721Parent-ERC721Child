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
    console.log(parent)
    if (parent == null){
      return null
    }
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
        //@ts-ignore
        relation.parent = parent
        relation.owner = data.parentMinteds[i].owner
      }
    }

    if(relation.parent == null){
      return "ERROR: No parent found with that ID"
    }

    for(let i = 0; i < data.childMinteds.length; i++){
      if(data.childMinteds[i].parentId == parent ){
        //@ts-ignore
        if (relation.children[data.childMinteds[i].contractAddress] != null){
          //@ts-ignore
          relation.children[data.childMinteds[i].contractAddress].push({id:data.childMinteds[i].childId, uri: null})
        }else{
          //@ts-ignore
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
      //@ts-ignore
      if(relation.children[data.uriupdateds[i].contractAddress] == null){
        continue
      }
      //@ts-ignore
      for(let j = 0; j < relation.children[data.uriupdateds[i].contractAddress].length; j++){
        //@ts-ignore
        if(relation.children[data.uriupdateds[i].contractAddress][j].id == data.uriupdateds[i].nftId){
          //@ts-ignore
          relation.children[data.uriupdateds[i].contractAddress][j].uri = data.uriupdateds[i].uri
        }
      }
    }

    return relation
  }



  return {
    fetchParentNFT,
    fetchParentChild,
  }
}
