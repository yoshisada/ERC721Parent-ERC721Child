import * as React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    triplegrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        marginTop: "80px",
        ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
          gridTemplateColumns: "repeat(1, 1fr)",
        }
        // [theme.breakpoints.down("sm")]: {
        //     gridTemplateColumns: "repeat(1, 1fr)",
        //   },

    },

    triplegriditem: {
        padding: "0 30px 0 30px",
        ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
          marginBottom: "30px"
        }
        // [theme.breakpoints.down("sm")]: {
        //     marginBottom: "30px"
        //   },
    },

    itemTitle: {
        fontFamily: "AKBold",
        fontSize: "max(2rem, 2vw)"
    },

    itemDesc: {
        fontFamily: "AKRegular",
        fontSize: "max(1rem, 1vw)"
    }
  
}));

function GoalsGrid() {

    const styles = useStyles();

    return(
      <Box className={styles.triplegrid}>
      <Box className={styles.triplegriditem}>
        <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
        <h1 className={styles.itemTitle}>Parent-Child Interaction</h1>
        <p className={styles.itemDesc} >NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
      </Box>

      <Box className={styles.triplegriditem}>
        <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
        <h1 className={styles.itemTitle}>Parent-Child Interaction</h1>
        <p className={styles.itemDesc} >NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
      </Box>

      <Box className={styles.triplegriditem}>
        <Image src={require("../assets/stock.jpeg")} alt="one" layout='responsive'/>
        <h1 className={styles.itemTitle}>Parent-Child Interaction</h1>
        <p className={styles.itemDesc} >NFTs are divided between two contracts,  Parent and Child.  This strucutre allows any parent to own a group of child tokens which follow the parent throughout it’s lifecycle.</p>
      </Box>
    </Box>
        
    )

}

export default GoalsGrid;