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




const ApartmentPage = () => {


    const { id } = useParams();
    const allApartment = useItems().apartment
    const location = useLocation();
    const [item, setItem] = useState()
    const [mobileView, setMobileView] = useState()
    const [index, setIndex] = useState(0)

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
    }, [])

    useEffect(() => {
        let x = allApartment.filter(item => item.itemId == id)
        setItem(x[0])
        console.log(x[0])
        window.scrollTo(0, 0)
        console.log(location.state)
    }, [useItems()])

    const handleSwitching = e => {
        console.log((item.images.length - 1) - e)
        console.log(e - (item.images.length - 1) * -1)
        console.log(e)
        setIndex(e)
    }

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>
            <Header stat={true} backgroundColor={true} />
            <div>
                {item != null && mobileView ?
                    <div>
                        <SwipeableViews index={index} onChangeIndex={handleSwitching} >
                            {
                                item.images.map((image, i) => {
                                    return <Card key={i} style={{ height: '16rem', marginTop: '1rem', background: 'none' }}>
                                        <img key={i} src={image.url}
                                            style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                                        />
                                    </Card>
                                })
                            }
                        </SwipeableViews>
                        {
                            item.images.map((pic, i) => {
                                return <div
                                    onClick={() => setIndex(item.images.length - 1 - i)}
                                    key={i}
                                    id={i}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '0.2rem',
                                        marginLeft: '0.2rem',
                                        display: "inline-block",
                                        backgroundColor: i === (item.images.length - 1 - index) ? 'black' : 'white',
                                        borderRadius: '50%',
                                        border: 'solid black 1px'
                                    }} ></div>
                            })
                        }
                    </div>
                    :
                    item != null && <Carousel className='apartment-page-carousel' disableArrowsOnEnd showArrows={mobileView ? false : true} enableMouseSwipe={mobileView ? true : false} enableSwipe breakPoints={breakPoints}  >
                        {
                            item.images.map((image, i) => {
                                return <Card key={i} style={{ height: mobileView ? '16rem' : '60vh', marginTop: '1rem' }}>
                                    <img key={i} src={image.url}
                                        style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                                    />
                                </Card>
                            })
                        }
                    </Carousel>
                }
                {item != null ?
                    <div >
                        <div style={{ padding: '1rem ' }}>
                            <span className='apartment-page-title' style={{ alignSelf: 'right', fontWeight: '700' }} >{item.name}</span>
                            <br />
                            <span className='apartment-page-title'> מחיר שיווק: ₪{item.price}</span>
                        </div>
                        <hr style={{ margin: '1rem 10% 2rem' }} />


                        <Grid container style={{ padding: '0 10%', textAlign: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: '100%' }}>


                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Elevator} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>מעלית</h6>
                                <div style={{ height: '3rem' }}><span >{item.elevator ? 'יש' : 'אין'}</span></div>

                            </Grid>

                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>


                                <img src={Parking} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>חניה</h6>
                                <div style={{ height: '3rem' }}><span >{item.parking ? 'יש' : 'אין'}</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Calendar} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>פינוי</h6>
                                <div style={{ height: '3rem' }}><span>{item.enterDate}</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Floor} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>קומה</h6>
                                <div style={{ height: '3rem' }}> <span>{item.floor}</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Rooms} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>חדרים</h6>
                                <div style={{ height: '3rem' }}>  <span>{item.rooms}</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Size} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>גודל</h6>
                                <div style={{ height: '3rem' }}> <span>{item.size} מ"ר</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Address} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>כתובת</h6>
                                <div style={{ height: '3rem' }}><span>{item.address},</span>
                                    <br /><span>{item.city}</span></div>

                            </Grid>
                            <Grid item
                                xs={3} sm={3} md={1} lg={1} xl={1}>

                                <img src={Balcony} className='icon-property' />
                                <h6 style={{ marginTop: '0.5rem' }}>מרפסת</h6>
                                <div style={{ height: '3rem' }}> <span>{item.balcony ? 'יש' : 'אין'}</span></div>

                            </Grid>
                        </Grid>

                        <h4 style={{ margin: '4rem 0 1rem' }}> פרטים נוספים</h4>

                        <span style={{ whiteSpace: 'pre-wrap' }}>{item.freeContext}</span>

                        <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
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

                        <ContactCommon itemName={item.name} messageType='messageByName' title='לפרטים נוספים ותיאום ביקור בנכס השאירו פרטים' />
                    </div>
                    : <div>loading...</div>}
            </div>
            <Footer />
            <FooterSticky />
        </div >
    )
}

export default ApartmentPage;