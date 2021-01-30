import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import { useItems } from '../../../context/itemContext';
import Recommended from '../../recommendedSwipe';
import ReportImg from '../../../assets/x.jpg';
import ReportImgPhone from '../../../assets/article-phone.jpg';
import RowImgPhone from '../../../assets/article-wide-phone.jpg';
import RowArtBeta from '../../../assets/z.jpg';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import logo from '../../../assets/loggo.png';

const OurStory = () => {

    useFirebaseConnect([
        `recommended`
        // { path: '/todos' } // object notation
    ])
    const recommended = useSelector(state => state.firebase.ordered.recommended)
    const location = useLocation()
    const [load, setLoad] = useState(false);
    // const recommended = useItems().recommended;
    const [mobileView, setMobileView] = useState(false)

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
        window.scrollTo(0, 0)
    }, [location]);
    useEffect(() => {
        console.log(recommended)
        setLoad(true)
    }, [recommended])

    if (!isLoaded(recommended)) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} className='blink-image' />

        </div>
    }
    return (
        <div style={{ textAlign: 'center', backgroundColor: 'rgb(243, 243, 241)' }}>
            <Header stat={true} backgroundColor={true} />
            <h4 style={{ marginTop: '1rem' }}>כתבו עלינו</h4>
            <Grid container
                className='grid-rec'>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ paddingBottom: '1rem' }}>

                    <img src={!mobileView ? ReportImg : ReportImgPhone} />


                    <div style={{ textAlign: 'left', paddingLeft: '5%' }}>
                        <a href='https://www.themarker.com/labels/1.9407813'>{'לכתבה המלאה >'}</a>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ paddingBottom: '1rem' }}>

                    <img src={!mobileView ? RowArtBeta : RowImgPhone} />

                    <div style={{ textAlign: 'left', paddingLeft: '5%' }}>
                        <a href='https://www.themarker.com/labels/local/1.9363555'>{'לכתבה המלאה >'}</a>
                    </div>

                </Grid>

            </Grid>

            {!load ? <div>loading...</div> : < div style={{ padding: '0 2rem 2rem' }}>
                <Recommended recommended={recommended} />
            </div>}

            <Footer />
            {/* <FooterSticky /> */}
        </div>
    )
}

export default OurStory;