import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import CollapseMenu from '../components/CollapseMenu'
import {LooksOneOutlined, LooksTwoOutlined} from '@mui/icons-material';
import { Box, Divider } from '@material-ui/core' ;
import logo from '../assets/ssmy.png';
import ethLogo from '../assets/eth-logo.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ERC721P&C</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>
      <main className={styles.main}>
        <Box className={styles.divide}></Box>
        <h1 className={styles.title}>
          <a>ERC721P & ERC721C</a>
        </h1>

        <h2 className={styles.description}>
          An implementation of ERC721
        </h2>

        <h3 className={styles.subtitle}>
          Focused on bringing more to NFTs
        </h3>

      </main>


      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Goals</a>
        </h1>

        <h2 className={styles.description}>
          Expand your NFT Ecosystem Post Launch
        </h2>

        <div className={styles.triplegrid}>
          <div className={styles.triplegriditem}>
            <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
            <h1>Parent-Child Interaction</h1>
            <p>NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
          </div>

          <div className={styles.triplegriditem}>
            <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
            <h1>Parent-Child Interaction</h1>
            <p>NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
          </div>

          <div className={styles.triplegriditem}>
            <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
            <h1>Parent-Child Interaction</h1>
            <p>NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
          </div>
        </div>

      </main>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Use Cases</a>
        </h1>

        <CollapseMenu/>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://ssmytech.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src={logo} alt="SSMY Logo" width={96}/>
          </span>
        </a>
        
        <h1 className={styles.credit}>A Product of ETHGlobalSF 2022 
          <Image src={ethLogo} alt="Ethereum" width={40}/>
        </h1>
      </footer>
    </div>
  )
}
