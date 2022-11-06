import Image from 'next/image';
import { Button} from '@mui/material';
import logo from '../assets/ssmy.png';
import mmLogo from '../assets/mm.png';
import { makeStyles } from "@mui/styles";
import { useMetaMaskInterface } from '../api/metamask-interface';

const useStyles = makeStyles(() => ({
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
}))

function MetaMaskButton() {

    const styles = useStyles();
    const {metaMaskStatus, metaMaskAccount, connectMetaMask} = useMetaMaskInterface();

    if (metaMaskStatus === "connected") {
        console.log(metaMaskAccount)
        const addy = metaMaskAccount ? metaMaskAccount.slice(0, 5) + '...' + metaMaskAccount.slice(-4) : 'Connected';
        return(
            <Button className={styles.mmButton}>
                {addy}
            </Button>
        )
    }
    return(
        <Button className={styles.mmButton} onClick={connectMetaMask}>
            <Image src={mmLogo} alt="MetaMask" width={30} className={styles.mmImage}/>
            Connect
        </Button>
    )
}

export default MetaMaskButton;