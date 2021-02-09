import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import { Card, Grid, Button, IconButton } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import Balcony from '../../../assets/balcony.png';
import Size from '../../../assets/house-design.png';
import Rooms from '../../../assets/open-door.png';
import Floor from '../../../assets/stairs.png';
import Calendar from '../../../assets/calendar.png'
import Elevator from '../../../assets/elevator.png';
import Parking from '../../../assets/parking.png';
import Address from '../../../assets/map.png';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import ContactCommon from '../../contactCommon';
import { useItems } from '../../../context/itemContext';
import SwipeableViews from 'react-swipeable-views';
import FullScreenImages from '../../fullScreenImages';
import { useFirebase } from 'react-redux-firebase';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/loggo.png';

const ApartmentPage = () => {
    const { id } = useParams();
    const { type } = useParams();
    useFirebaseConnect([
        `apartments/${type}/${id}`
        // { path: '/todos' } // object notation
    ])
    // const todo = useSelector(
    //     ({ firebase: { data } }) => data.todos && data.todos[todoId]
    //   )
    const apartment = useSelector(state => state.firebase.data.apartments && state.firebase.data.apartments[type][id])
    // const allApartment = useItems().apartment
    const location = useLocation();
    // const [item, setItem] = useState()
    const [mobileView, setMobileView] = useState()
    const [index, setIndex] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 950, itemsToShow: 1 },
        { width: 1200, itemsToShow: 1 },
    ];

    useEffect(() => {
        const setResponsiveness = () => {
            console.log('hellp')
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        window.scrollTo(0, 0)
    }, [])


    const handleSwitching = e => {
        console.log((apartment.images.length - 1) - e)
        console.log(e - (apartment.images.length - 1) * -1)
        console.log(e)
        setIndex(e)
    }
    const handleFullScreen = (i) => {
        console.log('hel')
        return
    }
    if (!isLoaded(apartment)) {
        console.log(apartment)
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} className='blink-image' />

        </div>
    }


    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>
            {fullScreen ? <FullScreenImages images={apartment.images} index={1} />
                :
                <div>
                    <Header stat={true} backgroundColor={true} />
                    <div>
                        {apartment != null && mobileView ?
                            <div>
                                <SwipeableViews index={index} onChangeIndex={handleSwitching} >
                                    {
                                        apartment.images.map((image, i) => {
                                            return <Card key={i} style={{ height: '16rem', marginTop: '1rem', background: 'none' }}>
                                                <img key={i} src={image.url}
                                                    style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                                                />
                                            </Card>
                                        })
                                    }
                                </SwipeableViews>
                                {
                                    apartment.images.map((pic, i) => {
                                        return <div
                                            onClick={() => setIndex(apartment.images.length - 1 - i)}
                                            key={i}
                                            id={i}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '0.2rem',
                                                marginLeft: '0.2rem',
                                                display: "inline-block",
                                                backgroundColor: i === (apartment.images.length - 1 - index) ? 'black' : 'white',
                                                borderRadius: '50%',
                                                border: 'solid black 1px'
                                            }} ></div>
                                    })
                                }
                            </div>
                            :
                            apartment != null && <Carousel className='apartment-page-carousel' disableArrowsOnEnd showArrows={mobileView ? false : true} enableMouseSwipe={mobileView ? true : false} enableSwipe breakPoints={breakPoints}  >
                                {
                                    apartment.images.map((image, i) => {
                                        return <Card key={i} style={{ height: mobileView ? '16rem' : '60vh', marginTop: '1rem' }} onClick={() => setFullScreen(true)}>
                                            <img key={i} src={image.url}
                                                style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                                            />
                                        </Card>
                                    })
                                }
                            </Carousel>
                        }
                        {apartment != null ?
                            <div >
                                <div style={{ padding: '1rem ' }}>
                                    <span className='apartment-page-title' style={{ alignSelf: 'right', fontWeight: '700' }} >{apartment.name}</span>
                                    <br />
                                    <span className='apartment-page-title'> מחיר שיווק: ₪{apartment.price}</span>
                                </div>
                                <hr style={{ margin: '1rem 10% 2rem' }} />


                                <Grid container style={{ padding: '0 10%', textAlign: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}>


                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Elevator} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>מעלית</h6>
                                        <div style={{ height: '3rem' }}><span >{apartment.elevator ? 'יש' : 'אין'}</span></div>

                                    </Grid>

                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>


                                        <img src={Parking} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>חניה</h6>
                                        <div style={{ height: '3rem' }}><span >{apartment.parking ? 'יש' : 'אין'}</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Calendar} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>פינוי</h6>
                                        <div style={{ height: '3rem' }}><span>{apartment.enterDate}</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Floor} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>קומה</h6>
                                        <div style={{ height: '3rem' }}> <span>{apartment.floor}</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Rooms} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>חדרים</h6>
                                        <div style={{ height: '3rem' }}>  <span>{apartment.rooms}</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Size} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>גודל</h6>
                                        <div style={{ height: '3rem' }}> <span>{apartment.size} מ"ר</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Address} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>כתובת</h6>
                                        <div style={{ height: '3rem' }}><span>{apartment.address},</span>
                                            <br /><span>{apartment.city}</span></div>

                                    </Grid>
                                    <Grid item
                                        xs={3} sm={3} md={1} lg={1} xl={1}>

                                        <img src={Balcony} className='icon-property' />
                                        <h6 style={{ marginTop: '0.5rem' }}>מרפסת</h6>
                                        <div style={{ height: '3rem' }}> <span>{apartment.balcony ? 'יש' : 'אין'}</span></div>

                                    </Grid>
                                </Grid>

                                <h4 style={{ margin: '4rem 0 1rem' }}> פרטים נוספים</h4>

                                <span style={{ whiteSpace: 'pre-wrap' }}>{apartment.freeContext}</span>

                                <div style={{ margin: '2rem 0 3rem', padding: '2rem 0', display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                    <Button href={`https://www.facebook.com/sharer/sharer.php?u=rind-nadlan.com${location.pathname}`} style={{ padding: '0 0.5rem', borderRadius: '0', marginLeft: '1rem', backgroundColor: 'blue', color: 'white' }}>

                                        <FacebookIcon fontSize='medium' style={{ marginLeft: '0.5rem', color: 'white' }} />

                                        <span style={{ fontSize: '1rem' }}>שתפו עכשיו</span>
                                    </Button>
                                    <Button href={`https://api.whatsapp.com/send?text=http://rint-nadlan.com${location.pathname}`} target="_blank" style={{
                                        padding: '0 0.5rem', borderRadius: '0', backgroundColor: 'green', color: 'white'
                                    }} >
                                        <IconButton style={{ padding: 0 }}
                                        >
                                            <WhatsAppIcon fontSize='medium' style={{ marginLeft: '0.5rem', color: 'white' }} />

                                        </IconButton>
                                        <span style={{ fontSize: '1rem' }}> שתפו עכשיו</span>
                                    </Button>
                                </div>

                                <ContactCommon itemName={apartment.name} messageType='apartmentMessages' title='לפרטים נוספים ותיאום ביקור בנכס השאירו פרטים' />
                            </div>
                            : <div>loading...</div>}
                    </div>
                    <Footer />
                    {/* <FooterSticky /> */}
                </div>
            }
        </div >
    )
}

export default ApartmentPage;