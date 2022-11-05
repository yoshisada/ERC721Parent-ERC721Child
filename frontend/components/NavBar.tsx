import * as React from 'react';
import Image from 'next/image';
import { AppBar, Container, Toolbar, Box, Button} from '@material-ui/core';
import logo from '../assets/ssmy.png';
import { makeStyles } from "@material-ui/core/styles";

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
    [theme.breakpoints.down("sm")]: {
        display: "none",
      },
  },

  ercContainer: {
    height: "60px",
    padding: "5px 0px 5px 80px",
    cursor: "pointer",
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
    padding: "0",
    marginTop: "5px",
    height: "15px",
    alignItems: "center",
    "&:hover a": {
        textDecoration: "underline"
    }
  },
}));

function NavBar() {

    const styles = useStyles();

    return(
        <AppBar className={styles.appbar} elevation={0}>
            <Toolbar disableGutters>

                <a href="https://ssmytech.com" target="_blank" rel="noopener noreferrer">
                    <Image className={styles.logo} src={logo} alt="logo" height={60}/>
                </a>

                <Box className={styles.ercContainer}>

                    <Button className={styles.ercButton}>
                    👨 <a>ERC721 Parent</a>
                    </Button>

                    <Button className={styles.ercButton}>
                    🧒 <a>ERC721 Child</a>
                    </Button>
                </Box>

                <Box className={styles.buttonContainer}>
                    
                    <Button className={styles.navButton}>
                        Mint
                    </Button>

                    <Button className={styles.navButton}>
                        Documentation
                    </Button>

                    <Button className={styles.navButton}>
                        Source
                    </Button>

                    <Button className={styles.navButton}>
                        MetaMask
                    </Button>
            
                </Box>
            </Toolbar>

        </AppBar>
    )

}

export default NavBar;