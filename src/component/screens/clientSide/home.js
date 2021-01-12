import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import SwipeImages from '../../imageCardSlide';
import Header from '../../header'
import Footer from '../../footer';
import { useLocation } from 'react-router-dom';
import TheImage from '../../../assets/homePic.jpg';
import MobileImage from '../../../assets/T.jpg';
import OfficePic from '../../../assets/officePic.jpg';

import PersonalAttention from '../../../assets/personalAttention.png';
import Professional from '../../../assets/professional.png';
import Escort from '../../../assets/hand.png';
import logo1 from '../../../assets/loggo.png'
import RecommendedSwipe from '../../recommendedSwipe';
import ContactUsCom from '../../contactUsCom';
import FooterSticky from '../../footerSticky';
import { useItems } from '../../../context/itemContext';
import HomeSwipePhone from '../../homeSwipePhone';
require('dotenv').config();

const Home = () => {
    const location = useLocation()
    const history = useHistory()
    const apartment = useItems().apartment
    const recommended = useItems().recommended
    const [mobileView, setMobileView] = useState()
    const [allApartmentB, setAllApartmentB] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(false)


    useEffect(() => {

        const setBackground = () => {
            console.log(window.pageYOffset)
            if (window.pageYOffset > 509) {
                setBackgroundColor(true)
            } else {
                console.log('asfasljnl')
                setBackgroundColor(false)
            }
        }
        window.addEventListener("scroll", () => setBackground());


    }, [])
    useEffect(() => {

        // const img = new Image();
        // img.onload = function () {
        //     alert(this.width + 'x' + this.height);
        // }
        // img.src = TheImage
        const setResponsiveness = () => {
            console.log('hellp')
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])



    const navigateToApartments = () => {
        history.push('/apartmentSell')
    }

    const navigateToApartment = (item) => {
        history.push({ state: item, pathname: `/apartmentPage/${item.itemId}` })
    }

    return (

        <div style={{
            textAlign: 'center', backgroundColor: '#f2f2f2'
        }} >

            <Header stat={mobileView ? true : false} backgroundColor={mobileView ? true : backgroundColor} />

            <div className='sub-header'>
                <div className='logo-subheader'>
                    <h1 className='sub-h1'>רועי רינט-יעוץ ושיווק נדל"ן</h1>
                    <h3 className='sub-h3'>כי מתווך טוב זה נכס</h3>
                </div>
                {mobileView ? <img src={TheImage} className='image-subheader' />
                    : <img src={TheImage} className='image-subheader' />
                    //'https://merkaz-nadlan.co.il/wp-content/uploads/2018/02/Depositphotos_21515189_l-2015-1024x682.jpg'
                }
            </div>
            <SwipeImages items={apartment} onClick={navigateToApartment} />
            <Button onClick={navigateToApartments}
                variant='contained'
                onMouseOver={() => setAllApartmentB(true)}
                onMouseLeave={() => setAllApartmentB(false)}
                style={{ borderRadius: 0, backgroundColor: allApartmentB ? 'white' : '#181615', border: '1px solid black', margin: ' 1rem' }}
            ><span style=
                {{ color: allApartmentB ? '#181615' : 'white', padding: '0.5rem 1rem' }}>
                    לכל הנכסים</span> </Button>
            <hr style={{ borderColor: 'gray' }} />
            <Grid container style={{ margin: '2rem 0' }}>
                <Grid item style={{ padding: '2rem 3rem' }}
                    xs={12} sm={12} md={4} lg={4} xl={4}>
                    <img src={PersonalAttention} height='80rem' />
                    <h4 style={{ padding: '0.5rem 0' }}>יחס אישי</h4>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1rem' }}>אצלנו כל לקוח מקבל עסקה שנתפרת למידותיו. אנחנו עושים הכל על מנת שהלקוח יקבל את העסקה המשתלמת והכדאית ביותר עבורו לטווח הארוך.</span>

                </Grid>
                <Grid item style={{ padding: '2rem 3rem' }}
                    xs={12} sm={12} md={4} lg={4} xl={4}>
                    <img src={Professional} height='80rem' />
                    <h4 style={{ padding: '0.5rem 0' }}>שירות מקצועי</h4>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1rem' }}>
                        אצלנו מחויבים כלפיכם בשירות ומקצועיות ברמה הגבוהה ביותר בתחומנו ונעמוד מאחורי המילים האלו .
                        כשאתם מבצעים עסקת הרת גורל , טוב לדעת שיש על מי לסמוך .
                 </span>
                </Grid>
                <Grid item style={{ padding: '2rem 3rem' }}
                    xs={12} sm={12} md={4} lg={4} xl={4}>
                    <img src={Escort} height='80rem' />
                    <h4 style={{ padding: '0.5rem 0' }}>ליווי מלא</h4>
                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1rem' }}>
                        כל לקוח שנכנס בפתח משרדנו, מקבל ליווי צמוד מרגע ההחלטה על קנייה או מכירת דירה. אנו דואגים כדי שלקוחותינו לא יצטרכו לדאוג. בחרנו בפינצטה את טובי המומחים על מנת לוודא שהתהליך ילך באופן החלק והטוב ביותר.
                    </span>
                </Grid>
            </Grid>

            <hr />
            <RecommendedSwipe recommended={recommended} />
            <hr />
            <img src={OfficePic} style={{ height: 'auto', width: '60%', margin: '2rem 0' }} />
            <hr style={{ marginBottom: '0' }} />
            <Footer />
            <FooterSticky />

        </div >

    )
}

export default Home;