import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Mint.module.css'
import { Box } from '@material-ui/core'
import ImageCarousel from '../components/ImageCarousel'

export default function Mint() {
    return(
        <div className={homeStyles.container}>
            <Head>
                <title>Mint ERC721P&C</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar />

            <main className={homeStyles.main}>
                <Box className={homeStyles.divide}></Box>
                <Box className={styles.mintContainer}>
                    <h1 className={`${styles.mintTitle}`}>
                        <a>Mint</a> your NFT.
                    </h1>

                    <ImageCarousel/>
                </Box>
            </main>

        </div>
    )

}