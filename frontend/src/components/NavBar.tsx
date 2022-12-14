import { useState } from 'react';
import Image from 'next/image';
import { AppBar, List, ListItem, Toolbar, Box, Button, Drawer, IconButton} from '@mui/material';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@mui/styles";
import { useMetaMaskInterface } from '../api/metamask-interface';
import MetaMaskButton from './MetaMaskButton';
import { Menu, Close } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  logo: {
    margin: "0 0 0 20px",
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  appbar: {
    width: "100%",
    backgroundColor: "#161616",
    borderBottom: "medium solid #2B2A2A",
  },

  toolbar: {
    width: "100%",
  },

  icon: {
    float: "right"
  },

  buttonContainer: {
    width: "100%",
    margin: "10px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    // [theme.breakpoints.down("sm")]: {
    //     display: "none",
    //   },
  },

  ercContainer: {
    height: "60px",
    width: "300px",
    padding: "5px 0px 5px 30px",
    // [theme.breakpoints.down("sm")]: {
    //     display: "none",
    //   },
  },

  navButton: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1.1em",
    fontFamily: "AKRegular",
    margin: "10px",
    cursor: "pointer",
    "&:hover": {
        textDecoration: "underline"
    },
    ['@media (max-width:960px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },

  navButtonPersist: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1.1em",
    fontFamily: "AKRegular",
    margin: "10px",
    cursor: "pointer",
    "&:hover": {
        textDecoration: "underline"
    },
  },

  ercButton: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1em",
    fontFamily: "AKRegular",
    padding: "0",
    marginTop: "5px",
    height: "15px",
    alignItems: "center",
    "&:hover": {
        textDecoration: "underline"
    }
  },
}));

function NavBar() {

    const styles = useStyles();
    const {metaMaskStatus, metaMaskAccount, connectMetaMask} = useMetaMaskInterface();

    return(
        <AppBar className={styles.appbar} elevation={0}>
            <Toolbar disableGutters className={styles.toolbar}>

                <a href="https://ssmytech.com" target="_blank" rel="noopener noreferrer">
                    <Image className={styles.logo} src={logo} alt="logo" height={70}/>
                </a>

                <Box className={styles.ercContainer}>
                    <Button className={styles.ercButton} href="/">
                    ???? ERC721 Parent
                    </Button>

                    <Button className={styles.ercButton} href="/">
                    ???? ERC721 Child
                    </Button>
                </Box>

                <Box className={styles.buttonContainer}>
                    
                    <Button className={styles.navButtonPersist} href="./mint">
                        Mint
                    </Button>

                    <Button className={styles.navButton} href="https://github.com/yoshisada/ERC721Parent-ERC721Child" target="_blank">
                        Documentation
                    </Button>

                    <Button className={styles.navButton} href="https://github.com/yoshisada/ERC721Parent-ERC721Child" target="_blank">
                        Source
                    </Button>

                    <MetaMaskButton/>
                </Box>

            </Toolbar>

        </AppBar>
    )

}

export default NavBar;