import { gql } from '@apollo/client'
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

  const fetchNFTOwners = async (callback: Function) => {
    try {
      const nftOwners = await fetch(`/api/owners`)
      const ownersJSON = await nftOwners.json()
      callback(ownersJSON)
    } catch (error) {
      console.error(error)
      callback({})
    }
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
    fetchNFTOwners,
    fetchNFTCollection,
    fetchCollectionOwners,
    fetchPrice,
    checkSoldOut,
    fetchStorefrontBalance,
    fetchAccountBalance,
    checkAccountant,
  }
}
