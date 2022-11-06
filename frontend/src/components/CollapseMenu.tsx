import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import logo from '../assets/ssmy.png';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({

    accordContainer: {
        margin: "30px 0 0 0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    
    accordTop: {
        marginTop: "20px",
        borderTop: "3px solid #2B2A2A",
    },

    accord: {
        padding: "10px",
        backgroundColor: "transparent",
        color: "white",
        borderBottom: "3px solid #2B2A2A",
        flex: "1 0 100%"
    },

    accordTitle: {
        fontFamily: "AKBold",
        fontSize: "max(2rem, 2.5vw)",
    },

    accordDetails: {
        fontFamily: "AKRegular",
        fontSize: "max(1rem, 1.5vw)",
    }
  
}));

function CollapseMenu() {

    const styles = useStyles();

    return(
        <Box className={styles.accordContainer}>
            <Accordion className={`${styles.accord} ${styles.accordTop}`} elevation={0} square={true}>
                <AccordionSummary
                    expandIcon={<ExpandMore htmlColor='white' fontSize='large' />}
                >
                    <Typography className={styles.accordTitle}>NFT Gamification</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={styles.accordDetails}>
                        Within the context of NFT games, a player accumulates items and rewards and can store them within one 'backpack' token. That player could then sell the entire backpack easily, transferring the backpack and thus all of the items to a buyer.
                        To trade individual items, the two parent 'backpack' tokens could come together to create an agreement to exchange specific child tokens.
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion className={styles.accord} elevation={0} square={true}>
                <AccordionSummary
                    expandIcon={<ExpandMore htmlColor='white' fontSize='large' />}
                >
                    <Typography className={styles.accordTitle}>Social Record Keeping</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={styles.accordDetails}>
                        For social/government documents rather than having each document be its own individual token without any encapsulation, one could establish a parent token to capture all related documents needed. Whenever these documents are required they are all in one place and can be signed/approved/transferred.
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion className={styles.accord} elevation={0} square={true}>
                <AccordionSummary
                    expandIcon={<ExpandMore htmlColor='white' fontSize='large' />}
                >
                    <Typography className={styles.accordTitle}>Distribution of Next Generation Art</Typography>
                </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={styles.accordDetails}>
                            Similar to the example NFT collection we built on this site, the genesis collection can be carried on to child collections where the parent is represented in each iteration. The parent and child contract relationship can serve to automate the process of achieving generational trait additions.
                        </Typography>
                    </AccordionDetails>
            </Accordion>


            <Accordion className={styles.accord} elevation={0} square={true}>
                <AccordionSummary
                    expandIcon={<ExpandMore htmlColor='white' fontSize='large' />}
                >
                    <Typography className={styles.accordTitle}>Post Mint Content</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={styles.accordDetails}>
                        There are a lot of NFT collections that fall into obscurity after the first genesis mint due to the lack of representation as volume dies out. Some collections may want to add more items to their ecosystem to generate attention and volume while maintaining their genesis collection. 
                    </Typography>
                </AccordionDetails>
            </Accordion>

            
        </Box>
        
    )

}

export default CollapseMenu;