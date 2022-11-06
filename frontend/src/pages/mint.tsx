import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Mint.module.css'
import { Box, Button } from '@material-ui/core'
import ImageCarousel from '../components/ImageCarousel'
import MintModule from '../components/MintModule'

export default function Mint() {
    return(
        <div className={homeStyles.container}>
            <Head>
                <title>Mint ERC721P&C</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
            <NavBar />
                <Box className={styles.mintContainer}>
                    <Box className={styles.mintInfoContainer}>
                        <div className={styles.title}><a>Mint</a> your NFT.</div>

                        <MintModule/>
                    </Box>

                    <ImageCarousel/>

                </Box>
            </main>

        </div>
    )

}