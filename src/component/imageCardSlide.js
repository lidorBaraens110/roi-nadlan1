import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core';
import Carousel from "react-elastic-carousel";
import { Slider } from '@material-ui/core';
import Card from './card';

const styles = {
    root: {
        padding: '0',
    },
    slideContainer: {
        padding: '0 10px 0',
    },
};
const useStyle = makeStyles({
    root: {
        padding: '2rem 0 0',
    }
});
const ImageCardSlide = ({ items, onClick, type }) => {
    const [mobileView, setMobileView] = useState();
    const [index, setIndex] = useState(0);
    const [isWidth, setIsWidth] = useState([])

    const handleChangeIndex = e => {
        setIndex(e)
    }
    useEffect(() => {

        const setResponsiveness = () => {

            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, [])


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 950, itemsToShow: 3 },
        { width: 1200, itemsToShow: 3 },
    ];
    const classes = useStyle()
    return (
        <div>
            {!mobileView ?

                <Carousel className={classes.root} itemPadding={[20, 20, 20, 20]} showArrows={mobileView || items.length < 2 ? false : true}
                    enableMouseSwipe={mobileView ? true : false} enableSwipe breakPoints={breakPoints} >
                    {
                        items.map((item, i) => {
                            if (item.value) {
                                return <Card key={i} item={item.value} type={type}
                                    imgClass={items.length < 2 ? 'slide-image-1' : 'slide-image'}
                                    cardName={items.length < 2 ? 'home-card-apartment-1' : 'home-card-apartment'}
                                    onClick={onClick}
                                />
                            }
                        })
                    }
                </Carousel>
                :
                <div style={{ textAlign: 'center' }}><SwipeableViews
                    index={index} onChangeIndex={handleChangeIndex}
                    enableMouseEvents
                    style={styles.root} slideStyle={styles.slideContainer}>
                    {
                        items.map((item, i) => {
                            return <Card key={i} item={item.value} type={type}
                                imgClass='slide-image'
                                cardName='home-card-apartment'
                                onClick={onClick}
                            />
                        })
                    }
                </SwipeableViews>
                    {
                        items.map((pic, i) => {
                            return <div
                                onClick={() => setIndex(items.length - 1 - i)}
                                key={i}
                                id={i}
                                style={{
                                    cursor: 'pointer',
                                    padding: '0 0.1rem',
                                    marginLeft: '0.1rem',
                                    display: "inline-block",
                                    backgroundColor: 'black',
                                    opacity: i === (items.length - 1 - index) ? '1' : '0.5',
                                    borderRadius: '50%',
                                    border: 'solid black 1px'
                                }} ></div>
                        })
                    }
                </div>

            }
        </div >


    );
}

export default ImageCardSlide;