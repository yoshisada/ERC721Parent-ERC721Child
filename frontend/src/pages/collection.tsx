import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Collection.module.css'
import { Box, Button } from '@mui/material'
import ImageCarousel from '../components/ImageCarousel'
import MintModule from '../components/MintModule'
import { useMetaMaskInterface } from '../api/metamask-interface'
import { useEffect, useState } from 'react'
import { useBackendAPI } from '../api/backend-interface'

export default function Mint() {
  const [parentToken, setParentToken] = useState('')
  const [relation, setRelation] = useState({})
  const [metadata, setMetadata] = useState({ childNFT: [], parentNFT: {} })
  const [fufilled, setFuilled] = useState(false)
  const {
    metaMaskStatus,
    metaMaskAccount,
    connectMetaMask,
    getParentToken,
  } = useMetaMaskInterface()
//   const { fetchParentChild } = useBackendAPI()
//   useEffect(() => {
//     async function fetchParent() {
//       const res = await getParentToken(metaMaskAccount)
//       setParentToken(res)
//     }
//     fetchParent()
//   }, [metaMaskAccount])
//   useEffect(() => {
//     async function fetchParent() {
//       const rel = await fetchParentChild(Number(parentToken))
//       setRelation(rel)
//     }
//     fetchParent()
//   }, [parentToken])
//   console.log(relation)

  //   useEffect(() => {
  //     async function getJson(input){
  //         fetch(input)
  //           .then((res) => res.json())
  //           .then((out) => {return out})
  //           .catch((err) => {
  //             throw err
  //           })
  //     }
  //     async function fetchParent() {
  //       const result = { childNFT: [], parentNFT: {} }
  //       if (relation.parentUri != null) {
  //         result['parentNFT'] = await getJson(relation.parentUri)
  //       } else {
  //         console.log(await getJson('https://ipfs.io/ipfs/QmYb76ZWSXBiTC7CT8dai6U7Fyhn4QnamwNoGdcTe33WEW'))
  //         // fetch(
  //         //   'https://ipfs.io/ipfs/QmYb76ZWSXBiTC7CT8dai6U7Fyhn4QnamwNoGdcTe33WEW',
  //         // )
  //         //   .then((res) => res.json())
  //         //   .then((out) => (result['parentNFT'] = out))
  //         //   .catch((err) => {
  //         //     throw err
  //         //   })
  //       }
  //       setFuilled(true)
  //       console.log('test', relation.children)
  //       if (
  //         relation.children != null &&
  //         Object.keys(relation.children).length != 0
  //       ) {
  //         for (let i = 0; i < Object.keys(relation.children).length; i++) {
  //           for (
  //             let j = 0;
  //             j <
  //             Object.values(relation.children[Object.keys(relation.children)[i]])
  //               .length;
  //             j++
  //           ) {
  //             if (
  //               Object.values(
  //                 relation.children[Object.keys(relation.children)[i]],
  //               )[j].uri != null
  //             ) {
  //               fetch(relation.parentUri)
  //                 .then((res) => res.json())
  //                 .then((out) => result['childNFT'].push(out))
  //                 .catch((err) => {
  //                   throw err
  //                 })
  //             } else {
  //               fetch(
  //                 'https://ipfs.io/ipfs/QmaNckuTMfdbG1eixReFmW8CddMCDK36VRSPWfahxA5Scf',
  //               )
  //                 .then((res) => res.json())
  //                 .then((out) => result['childNFT'].push(out))
  //                 .catch((err) => {
  //                   throw err
  //                 })
  //             }
  //             setMetadata(result)
  //           }
  //         }
  //       }
  //       setMetadata(result)

  //       // const rel = await fetchParentChild(Number(parentToken));
  //       // setRelation(rel);
  //     }
  //     if (relation !== {}) {
  //       fetchParent()
  //     }
  //   }, [relation])
  console.log(relation)
  console.log(parentToken)
  console.log(metadata)
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Mint ERC721P&C</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
      </Head>
    
      <main className={styles.main}>
        <NavBar />
        <div className={styles.collectionContainer}>
            <div className={styles.osButton}>
                View Parent Collection on Opensea
            </div>
            <div className={styles.osButton}>
                View Child 1 Collection on Opensea
            </div>
            <div className={styles.osButton}>
                View Child 2 Collection on Opensea
            </div>
        </div>
        {/*  */}
        {/* <Box className={styles.mintContainer}>
                    <Box className={styles.mintInfoContainer}>
                        <div className={styles.title}><a>Mint</a> your NFT.</div>

                        <MintModule/>
                    </Box>

                    <ImageCarousel/>

                </Box> */}
      </main>
    </div>
  )
}
