import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import { useItems } from '../../../context/itemContext';
import Recommended from '../../recommendedSwipe';
import ReportImg from '../../../assets/x.jpg';
import ReportImgPhone from '../../../assets/article-phone.jpg';
import RowImgPhone from '../../../assets/article-wide-phone.jpg';
import RowArtBeta from '../../../assets/z.jpg';

const OurStory = () => {
    const [load, setLoad] = useState(false);
    const recommended = useItems().recommended;
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
        console.log(recommended)
        setLoad(true)
    }, [recommended])
    return (
        <div style={{ textAlign: 'center', backgroundColor: 'rgb(243, 243, 241)' }}>
            <Header stat={true} backgroundColor={true} />
            <h4 style={{ marginTop: '1rem' }}>כתבו עלינו</h4>
            {/* <div style={{ margin: '1rem 15%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> */}
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
            {/* <div style={{ textAlign: 'left' }}>
                    <img src={ReportImg} />
                    <br />
                    <a href='https://www.themarker.com/labels/1.9407813'>לכתבה המלאה</a>
                </div>
                <div style={{ fontSize: '0.8rem', textAlign: 'left' }}>
                    <img src={RowArtBeta} />
                    <br />

                    <a href='https://www.themarker.com/labels/local/1.9363555'>{'לכתבה המלאה'}</a>

                </div> */}
            {/* </div> */}
            {!load ? <div>loading...</div> : < div style={{ padding: '0 2rem 2rem' }}>
                <Recommended recommended={recommended} />
            </div>}

            <Footer />
            <FooterSticky />
        </div>
    )
}

export default OurStory;