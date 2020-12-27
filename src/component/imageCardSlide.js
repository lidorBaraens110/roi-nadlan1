import React, { useEffect, useState, useLayoutEffect } from 'react';
// import ReactCardCarousel from 'react-card-carousel';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Icon, CardMedia, makeStyles, Typography, Button } from '@material-ui/core';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import Carousel from "react-elastic-carousel";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Card from './card';

const useStyle = makeStyles({
    root: {
        padding: '8rem 0',
    }
})
const ImageCardSlide = ({ items, onClick, navigateAllApartment }) => {
    useEffect(() => {
        console.log(items)
    })


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 950, itemsToShow: 2 },
        { width: 1200, itemsToShow: 3 },
    ];
    const classes = useStyle()
    return (

        <Carousel className={classes.root} enableMouseSwipe={false} enableSwipe breakPoints={breakPoints} >
            {
                items.map((item, i) => {
                    return <Card key={i} item={item}
                        styleCard={{ borderRadius: 0, marginBottom: '1rem' }}
                        styleImg={{ height: '20rem', width: '30rem', objectFit: 'contain' }} />
                })
            }
        </Carousel>


    );
}

export default ImageCardSlide;


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
    return <span>Window size: {width} x {height}</span>;
}