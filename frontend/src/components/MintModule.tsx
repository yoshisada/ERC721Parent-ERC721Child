import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AppBar, Container, Toolbar, Box, Button} from '@mui/material';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@mui/styles";
import { useMetaMaskInterface } from '../api/metamask-interface';

const useStyles = makeStyles((theme) => ({

    buttonContainer: {
        width: "100%",
        padding: "0 0 20px 20px",
        display: "flex",
        flex: "1 0 100%",
        justifyContent: "left"
    },

    mintButton: {
        width: "auto",
        height: "80px",
        fontSize: "max(1.5rem, 2vw)",
        fontFamily: "AKRegular",
        padding: "20px",
        margin: "20px 30px 0 10px",
        backgroundColor: "#FFCC30",
        borderRadius: "75px",
        lineHeight: "1",
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

    const [parentToken, setParentToken] = useState('');

    const styles = useStyles();
    const {metaMaskAccount, metaMaskStatus, connectMetaMask, mintParent, mintChild1, mintChild2, getParentToken} = useMetaMaskInterface();

    useEffect(() => {
        async function fetchParent() {
            const res = await getParentToken(metaMaskAccount);
            setParentToken(res);
        }
        fetchParent();
    }, [metaMaskAccount])
    
    if (metaMaskStatus === "connected") {

        if (parentToken == '') {
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
                        <Button className={styles.mintButton} onClick={mintChild1}>mint child1</Button>
                        <Button className={styles.mintButton} onClick={mintChild2}>mint child2</Button>
                    </Box>
                </Box>
            )
        }
    } else {
        return(
            <Box>
                <Box className={styles.buttonContainer}>
                    <Box className={styles.subText}>Please connect your wallet to mint</Box>
                </Box>
            </Box>
        )
    }


}

export default MintModule;