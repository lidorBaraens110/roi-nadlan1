import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import SwipeImages from '../../imageCardSlide';
import Header from '../../header'
import Footer from '../../footer';
import { useLocation } from 'react-router-dom';
import TheImage from '../../../assets/homePic.jpg';
import GroupCom from '../../groupCom';
import PersonalAttention from '../../../assets/personalAttention.png';
import Professional from '../../../assets/professional.png';
import Escort from '../../../assets/hand.png';
import RecommendedSwipe from '../../recommendedSwipe';
import FooterSticky from '../../footerSticky';
import { initial } from '../../actions';
import { useItems } from '../../../context/itemContext';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useFirebase } from 'react-redux-firebase';
import logo from '../../../assets/loggo.png';

const Home = () => {

    useFirebaseConnect([
        'items',
        'messages',
        'recommended'
        // { path: '/todos' } // object notation
    ])
    // const firebase = useFirebase()

    // function addSampleTodo() {
    //     const sampleTodo = { text: 'Sample', done: false }
    //     return firebase.push('todos', sampleTodo)
    // }


    const apartment = useSelector((state) => state.firebase.ordered.items)
    const recommended = useSelector(state => state.firebase.ordered.recommended)
    const dispatch = useDispatch()

    const location = useLocation()
    const history = useHistory()
    // const apartment = useItems().apartment
    // const recommended = useItems().recommended
    const [mobileView, setMobileView] = useState()
    const [allApartmentB, setAllApartmentB] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(false)


    useEffect(() => {
        // dispatch(initial())
        console.log(recommended)
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

    if (!isLoaded(apartment) || !isLoaded(recommended)) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} className='blink-image' />

        </div>
    }

    // if (isEmpty(apartment)&&!i) {
    //     return <div>Todos List Is Empty</div>
    // }
    return (

        <div style={{
            textAlign: 'center', backgroundColor: '#eaeaea'
        }} >

            <Header stat={mobileView ? true : false} backgroundColor={mobileView ? true : backgroundColor} />

            <div className='sub-header'>
                <div className='logo-subheader'>
                    <h1 className='sub-h1'>רועי רינט-יעוץ ושיווק נדל"ן</h1>
                    <h3 className='sub-h3'>כי מתווך טוב זה נכס</h3>
                </div>
                {mobileView ? <img src={TheImage} className='image-subheader' />
                    : <img src={TheImage} className='image-subheader' />
                }
            </div>
            <div >
                {/* <button onClick={() => console.log(recommended)}>chceck</button> */}
                <SwipeImages items={apartment} onClick={navigateToApartment} />
                <Button onClick={navigateToApartments}
                    variant='contained'
                    onMouseOver={() => setAllApartmentB(true)}
                    onMouseLeave={() => setAllApartmentB(false)}
                    style={{ borderRadius: 0, backgroundColor: allApartmentB ? 'white' : '#181615', border: '1px solid black', margin: ' 1rem' }}
                ><span style=
                    {{ color: allApartmentB ? '#181615' : 'white', padding: !mobileView ? '0.5rem 1rem' : '0.25rem 0.5rem', fontSize: mobileView && '0.8rem' }}>
                        לכל הנכסים</span> </Button>
                <hr />
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
                            אצלנו מחויביים כלפיכם בשירות ומקצועיות ברמה הגבוהה ביותר בתחומנו, ואנו נעמוד מאחורי המילים האלו .
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

                <GroupCom />
            </div>
            <Footer />
            {/* <FooterSticky /> */}

        </div >

    )
}

export default Home;