import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Header from '../../header';
import Footer from '../../footer';
import { useItems } from '../../../context/itemContext';
import Recommended from '../../recommendedSwipe';

import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import logo from '../../../assets/loggo.png';


const OurStory = () => {

    useFirebaseConnect([
        `recommended`,
        `ourArticles`
        // { path: '/todos' } // object notation
    ])
    const recommended = useSelector(state => state.firebase.ordered.recommended);
    const ourArticles = useSelector(state => state.firebase.ordered.ourArticles);
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
        console.log(ourArticles)

    }, [ourArticles])

    if (!isLoaded(recommended) || !isLoaded(ourArticles)) {
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
                {!isEmpty(ourArticles) && ourArticles.map(ourArticle => {
                    if (ourArticle.value) {
                        return <Grid key={ourArticle.key} item xs={12} sm={12} md={6} lg={6} xl={6} style={{ paddingBottom: '1rem' }}>

                            <img src={ourArticle.value.img.url} width='100%' />


                            <div style={{ textAlign: 'left' }}>
                                <a href={ourArticle.value.htmlURL}>{'לכתבה המלאה >'}</a>
                            </div>
                        </Grid>
                    }
                })}


            </Grid>
            {!isEmpty(recommended) && <Recommended recommended={recommended} />}
            {/* {!load ? <div>loading...</div> : < div style={{ padding: '0 2rem 2rem' }}>
              
            </div>} */}

            <Footer />
            {/* <FooterSticky /> */}
        </div>
    )
}

export default OurStory;