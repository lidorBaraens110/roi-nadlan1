import React, { useEffect, useState, useContext } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
// import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router-dom'
import firebase from '../../firebase';
import SwipeImages from '../imageCardSlide';
import Header from '../header'
import Footer from '../footer';
import TheImage from '../../assets/homeImage.jpg';
import MobileImage from '../../assets/T.jpg';
import OfficePic from '../../assets/officePic.jpg';

import PersonalAttention from '../../assets/personalAttention.png';
import Professional from '../../assets/professional.png';
import Escort from '../../assets/hand.png';

import RecommendedSwipe from '../recommendedSwipe';
import ContactUsCom from '../contactUsCom';
import FooterSticky from '../footerSticky';
import { useApartment } from '../../context/apartmentContext';
import logo1 from '../../assets/loggo.png'

require('dotenv').config();

const Home = () => {
    const history = useHistory()
    // const [itemList, setItemList] = useState([]);
    const apartment = useApartment()
    const [mobileView, setMobileView] = useState()
    const [allApartmentB, setAllApartmentB] = useState(false);

    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY)
        const setResponsiveness = () => {
            console.log('hellp')
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

    }, []);


    const navigateToApartment = () => {
        history.push('/apartmentSell')
    }


    // const props = useSpring({
    //     config: { duration: 1500 },
    //     opacity: 1,
    //     from: { opacity: 0 },
    //     textAlign: 'center',
    //     padding: '0'

    // })
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }} >
            <Header />

            <div className='sub-header'>
                <h1 className='firsth1'>
                    כי מתווך טוב זה<strong style={{ color: 'green' }} > נכס </strong>
                    ..
                </h1>

                <img src={logo1} className='logo-subheader' />
                <h1 className='secondh1'>
                    כי מתווך טוב זה<strong style={{ color: 'green' }} > נכס </strong>

                </h1>
                {mobileView ? <img src={MobileImage} className='image-subheader' />
                    : <img src={TheImage} className='image-subheader' />
                }
            </div>
            {/* <img class="img-fluid" src={TheImage} alt="Snow" /> */}

            <ContactUsCom />

            <Grid container style={{ marginTop: '2rem' }}>
                <Grid item style={{ padding: '2rem 5rem' }}
                    sm={12} md={12} lg={4} xl={4}>
                    <img src={PersonalAttention} />
                    <h3 style={{ padding: '1rem 0' }}>יחס אישי</h3>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1.5rem' }}>אצלנו כל לקוח מקבל עסקה שנתפרת למידותיו. אנחנו עושים הכל על מנת שהלקוח יקבל את העסקה המשתלמת והכדאית ביותר עבורו לטווח הארוך.</span>

                </Grid>
                <Grid item style={{ padding: '2rem 5rem' }}
                    sm={12} md={12} lg={4} xl={4}>
                    <img src={Professional} height='100rem' />
                    <h3 style={{ padding: '1rem 0' }}>שירות מקצועי</h3>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1.5rem' }}>אצלנו כל לקוח מקבל עסקה שנתפרת למידותיו. אנחנו עושים הכל על מנת שהלקוח יקבל את העסקה המשתלמת והכדאית ביותר עבורו לטווח הארוך.</span>

                </Grid>
                <Grid item style={{ padding: '2rem 5rem' }}
                    sm={12} md={12} lg={4} xl={4}>
                    <img src={Escort} height='100rem' style={{ objectFit: 'cover' }} />
                    <h3 style={{ padding: '1rem 0' }}>ליווי מלא</h3>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1.5rem' }}>אצלנו כל לקוח מקבל עסקה שנתפרת למידותיו. אנחנו עושים הכל על מנת שהלקוח יקבל את העסקה המשתלמת והכדאית ביותר עבורו לטווח הארוך.</span>
                </Grid>
            </Grid>

            <SwipeImages items={apartment} />
            <Button onClick={navigateToApartment}
                variant='contained'
                onMouseOver={() => setAllApartmentB(true)}
                onMouseLeave={() => setAllApartmentB(false)}
                style={{ borderRadius: 0, backgroundColor: allApartmentB ? 'white' : '#181615', border: '1px solid black' }}
            ><Typography variant='h5' style={{ color: allApartmentB ? '#181615' : 'white', padding: '0.5rem 1rem' }}>לכל הנכסים</Typography> </Button>
            <RecommendedSwipe />

            <img src={OfficePic} style={{ height: '90vh', width: 'auto', margin: '8rem 0' }} />
            <Footer />
            <FooterSticky />

        </div >
    )
}

export default Home;