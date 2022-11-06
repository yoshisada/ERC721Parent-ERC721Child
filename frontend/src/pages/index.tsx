import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import CollapseMenu from '../components/CollapseMenu'
import { Box, Divider } from '@mui/material' ;
import GoalsGrid from '../components/GoalsGrid';
import logo from '../assets/ssmy.png';
import ethLogo from '../assets/eth-logo.png';
import unrevealed from '../assets/unrevealed.png'
import { useBackendAPI } from '../api/backend-interface'

export default function Home() {
  const { fetchParentNFT, fetchParentChild } = useBackendAPI()
  const parentData = fetchParentNFT();
  const relational = fetchParentChild(1);
  console.log(parentData)
  console.log(relational)
  return (
    <div className={styles.container}>
      <Head>
        <title>ERC721P&C</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>ERC721P & ERC721C</a>
        </h1>

        <h2 className={styles.description}>
          An implementation of ERC721
        </h2>

        <h3 className={styles.subtitle}>
          Focused on bringing more to NFTs
        </h3>

        <Image src={unrevealed} alt="unrevealed" className={styles.backImg}/>

      </main>


      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Goals</a>
        </h1>

        <h2 className={styles.subtitle}>
          Expand your NFT Ecosystem Post Launch
        </h2>

        <GoalsGrid />

      </main>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Use Cases</a>
        </h1>

        <CollapseMenu/>

      </main>

      <footer className={styles.footer}>
        
        <h1 className={styles.credit}>A Product of ETHGlobalSF 2022 
          <Image src={ethLogo} alt="Ethereum" width={40}/>
        </h1>
      </footer>
    </div>
  )
}
