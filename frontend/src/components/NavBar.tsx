import * as React from 'react';
import Image from 'next/image';
import { AppBar, Container, Toolbar, Box, Button} from '@material-ui/core';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@material-ui/core/styles";
import { useMetaMaskInterface } from '../api/metamask-interface';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: "0 0 0 20px"
  },
  appbar: {
    backgroundColor: "#161616",
    borderBottom: "medium solid #2B2A2A",
  },
  buttonContainer: {
    width: "100%",
    margin: "10px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        display: "none",
      },
  },

  ercContainer: {
    height: "60px",
    padding: "5px 0px 5px 50px",
    [theme.breakpoints.down("sm")]: {
        display: "none",
      },
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
    }
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

  mmButton: {
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "55px",
    color: "black",
    padding: "0 20px 0 20px",
    margin: "0 30px 0 15px",
    fontFamily: "AKRegular",
    "&:hover": {
        backgroundColor: "transparent",
        color: "white",
        outline: "medium solid white"
    }
  },
  mmImage: {
    marginRight: "10px"
  }
}));

function NavBar() {

    const styles = useStyles();

    return(
        <AppBar className={styles.appbar} elevation={0}>
            <Toolbar disableGutters>

                <a href="https://ssmytech.com" target="_blank" rel="noopener noreferrer">
                    <Image className={styles.logo} src={logo} alt="logo" height={70}/>
                </a>

                <Box className={styles.ercContainer}>
                    <Button className={styles.ercButton} href="/">
                    👨 ERC721 Parent
                    </Button>

                    <Button className={styles.ercButton} href="/">
                    🧒 ERC721 Child
                    </Button>
                </Box>

                <Box className={styles.buttonContainer}>
                    
                    <Button className={styles.navButton} href="./mint">
                        Mint
                    </Button>

                    <Button className={styles.navButton}>
                        Documentation
                    </Button>

                    <Button className={styles.navButton}>
                        Source
                    </Button>

                    <Button className={styles.mmButton}>
                        <Image src={mmLogo} alt="MetaMask" width={30} className={styles.mmImage}/>
                        Connect
                    </Button>
            
                </Box>
            </Toolbar>

        </AppBar>
    )

}

export default NavBar;