import * as React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import one from '../assets/bracelet1.png';
import two from '../assets/bracelet2.png';
import three from '../assets/bracelet3.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [one, two, three]

const useStyles = makeStyles((theme) => ({
    caroImage: {
        width: "33%",
        height: "auto"
    },

    caroContainer: {
        width: "100%",
        padding: "70px",
    },

    imageContainer: {
        width: "100%",
        display: "flex",
        flex: "1 0 100%",
        alignItems: "center",
        justifyContent: "center"
    }
}));

function ImageCarousel() {

    const styles = useStyles();

    return(
        <div className={styles.caroContainer}>
            <Carousel centerMode={false} axis={'horizontal'} interval={2000} showThumbs={false} dynamicHeight={false} infiniteLoop={true} stopOnHover={true} showStatus={false} showArrows={false} showIndicators={false} swipeable={true} emulateTouch={true} autoPlay={true}>
                {images.map((img, ind) => (
                    <div className={styles.imageContainer}>
                        <Image src={img} alt={String(ind)} className={styles.caroImage}/>
                    </div>
                ))}
            </Carousel>
        </div>
    )

}

export default ImageCarousel;