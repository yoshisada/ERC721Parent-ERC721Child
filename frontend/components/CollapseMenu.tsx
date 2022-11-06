import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import { ExpandMore } from '@mui/icons-material';
import logo from '../assets/ssmy.png';
import { makeStyles } from "@material-ui/core/styles";

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
                <Typography className={styles.accordTitle}>3D PFP NFT Collection</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography className={styles.accordDetails}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>

            
        </Box>
        
    )

}

export default CollapseMenu;