import * as React from 'react';
import Image from 'next/image';
import { Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import one from '../assets/fidenza58.png';

const images = [one, one, one]

const useStyles = makeStyles((theme) => ({
    
    imageContainer: {
        width: "33%",
    }
    
}));

function ImageCarousel() {

    const styles = useStyles();

    return(
        <Box className={styles.imageContainer}>
        </Box>  
    )

}

export default ImageCarousel;