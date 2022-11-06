import * as React from 'react';
import Image from 'next/image';
import { AppBar, Container, Toolbar, Box, Button} from '@material-ui/core';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    buttonContainer: {
        width: "100%",
        padding: "0 0 20px 20px"
    },

    mintButton: {
        width: "180px",
        height: "10vh",
        fontSize: "max(2rem, 2.5vw)",
        fontFamily: "AKRegular",
        backgroundColor: "#FFCC30",
        borderRadius: "75px",
        color: "white",
        "&:hover": {
            backgroundColor: 'transparent',
            border: "medium solid #FFCC30",
            color: "#FFCC30"
        }
    },

    supplyText: {
        fontSize: "max(3.5rem, 4.5vw)",
        padding: "0 0 20px 20px"
    }
}));

function MintModule() {

    const styles = useStyles();

    return(
        <Box>
            <Box className={styles.supplyText}># minted / supply</Box>
            <Box className={styles.buttonContainer}>
                <Button className={styles.mintButton}>mint</Button>
            </Box>
        </Box>
    )

}

export default MintModule;