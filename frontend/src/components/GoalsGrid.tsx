import * as React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    triplegrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        marginTop: "50px",
        ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
          gridTemplateColumns: "repeat(1, 1fr)",
        }

    },

    triplegriditem: {
        padding: "30px 30px 0 30px",
        ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
          margin: "0 0 30px 0"
        }
    },

    itemTitle: {
        fontFamily: "AKBold",
        fontSize: "max(2rem, 2vw)"
    },

    itemDesc: {
        fontFamily: "AKRegular",
        fontSize: "max(1rem, 1vw)",
        lineHeight: "2"
    }
  
}));

function GoalsGrid() {

    const styles = useStyles();

    return(
      <Box className={styles.triplegrid}>
      <Box className={styles.triplegriditem}>
        <h1 className={styles.itemTitle}>Parent-Child Interaction</h1>
        <p className={styles.itemDesc}>NFTs are divided between two contracts,  Parent and Child.  This structure allows any parent to own a group of child tokens which follow the parent throughout its lifecycle. When the parent token is transferred, all child tokens belonging to it follow.</p>
      </Box>

      <Box className={styles.triplegriditem}>
        <h1 className={styles.itemTitle}>Expandable Ecosystem</h1>
        <p className={styles.itemDesc} >After an NFT's mints its genesis collection founders are able to deploy child collections directly tied to the genesis mint. A collection within a collection. This gives the ability to manage and maintain associated tokens within one parent token.</p>
      </Box>

      <Box className={styles.triplegriditem}>
        <h1 className={styles.itemTitle}>Generative Iteration</h1>
        <p className={styles.itemDesc} >The Art Blocks project was a part of the inspiration behind the idea of crafting subsequent, generative tokens that held resemblance to its parent token. Given any child token, one is able to trace its way back to the parent token, viewing the changes throughout each generation.</p>
      </Box>
    </Box>
        
    )

}

export default GoalsGrid;