import * as React from 'react';
import Image from 'next/image';
import { AppBar, Container, Toolbar, Box, Button} from '@mui/material';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@mui/styles";
import { useMetaMaskInterface } from '../api/metamask-interface';

const useStyles = makeStyles((theme) => ({

    buttonContainer: {
        width: "100%",
        padding: "0 0 20px 20px"
    },

    mintButton: {
        width: "auto",
        height: "80px",
        fontSize: "max(1.5rem, 2vw)",
        fontFamily: "AKRegular",
        padding: "20px",
        backgroundColor: "#FFCC30",
        borderRadius: "75px",
        color: "white",
        "&:hover": {
            backgroundColor: 'transparent',
            outline: "medium solid #FFCC30",
            color: "#FFCC30"
        }
    },

    subText: {
        fontSize: "max(2rem, 2vw)",
        padding: "0 0 20px 0"
    }
}));

function MintModule() {

    const styles = useStyles();
    const {metaMaskAccount, metaMaskStatus, connectMetaMask, mintParent} = useMetaMaskInterface();

    if (metaMaskStatus === "connected") {
        return(
            <Box>
                <Box className={styles.buttonContainer}>
                    <Button className={styles.mintButton} onClick={mintParent}>mint parent</Button>
                </Box>
            </Box>
        )
    } else {

    return(
        <Box>
            <Box className={styles.buttonContainer}>
                <Box className={styles.subText}>Please connect your wallet to mint</Box>
                <Button className={styles.mintButton} disabled={true}>mint</Button>
            </Box>
        </Box>
    )
    }


}

export default MintModule;