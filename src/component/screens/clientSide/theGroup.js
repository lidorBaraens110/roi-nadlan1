import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import RoiImg from '../../../assets/roi-b.jpeg';
import RoiMobileImg from '../../../assets/roi-a.jpg';
import AyeletImg from '../../../assets/ayala-a.jpg';
import ItzikImg from '../../../assets/itzik-a.jpg'
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';


const TheGroup = () => {
    const location = useLocation()
    const [mobileView, setMobileView] = useState();
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
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f2f2f2' }}>
            <Header stat={true} backgroundColor={true} />
            {!mobileView ?
                <div style={{ padding: '1rem 9rem' }}>
                    <h3>על הצוות</h3>
                    <div style={{ padding: '5rem 0', textAlign: 'right', display: 'flex', flexDirection: 'row' }}>
                        <img src={RoiImg} style={{ height: '400px', width: 'auto', marginLeft: '2rem' }} />
                        <div style={{ height: '400px', display: 'block' }}>
                            <h3 >רועי רינט</h3>
                            <h5>מנכל ובעלים של קבוצת רינט</h5>
                            <span style={{ lineHeight: 2 }}>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                    <div style={{ margin: '4rem 5rem', textAlign: 'right', display: 'flex', flexDirection: 'row' }}>
                        <img src={AyeletImg} style={{ height: '200px', width: 'auto', marginLeft: '2rem' }} />
                        <div style={{ display: 'block', height: '200px' }}>
                            <h3 >איילת הופמן זוארץ</h3>
                            <h5>מתכננת ומעצבת פנים</h5>
                            <span>איילת הופמן זוארץ (40), מתכננת ומעצבת פנים, מתמחה בהשבחות נדל"ן והום סטייג'ינג,תכנון מחדש ועיצוב פנים של דירות ובתים
                            אמא ל-2 ילדים, מתגוררת בראשון.
                            יצירתיות הם שם המפתח אצל איילת, היא אמנית ומביאה לידי ביטוי בכל תחומי עיסוקה את היצירתיות והחשיבה מחוץ לקופסא.
איילת היא פדנטית וחושבת על כל הפרטים הקטנים כגדולים. התכונות האלה ביחד מסייעות לה בכל פרויקט אליו היא ניגשת.</span>
                        </div>
                    </div>
                    <div style={{ margin: '4rem 5rem', textAlign: 'right', display: 'flex', flexDirection: 'row' }}>
                        <img src={ItzikImg} style={{ height: '200px', width: 'auto', marginLeft: '2rem' }} />
                        <div style={{ height: '200px' }}>
                            <h3 >איציק</h3>
                            <h5>מנהל שיווק</h5>
                            <span>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                </div>
                : <div style={{ padding: '1rem' }}>
                    <h3>על הצוות</h3>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={RoiMobileImg} style={{ marginBottom: '1rem' }} />

                        <h5 >רועי רינט</h5>
                        <h6>מנכל ובעלים של קבוצת רינט</h6>
                        <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                            <span style={{ fontSize: '0.8rem' }}>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={AyeletImg} style={{ marginBottom: '1rem' }} />

                        <h5 >איילת הופמן זוארץ</h5>
                        <h6>מתכננת ומעצבת פנים</h6>
                        <div style={{
                            textAlign: 'right', lineHeight: 1.2
                        }}>
                            <span style={{ fontSize: '0.8rem' }}>איילת הופמן זוארץ (40), מתכננת ומעצבת פנים, מתמחה בהשבחות נדל"ן והום סטייג'ינג,תכנון מחדש ועיצוב פנים של דירות ובתים
                            אמא ל-2 ילדים, מתגוררת בראשון.
                            יצירתיות הם שם המפתח אצל איילת, היא אמנית ומביאה לידי ביטוי בכל תחומי עיסוקה את היצירתיות והחשיבה מחוץ לקופסא.
איילת היא פדנטית וחושבת על כל הפרטים הקטנים כגדולים. התכונות האלה ביחד מסייעות לה בכל פרויקט אליו היא ניגשת.</span>
                        </div>
                    </div>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={ItzikImg} style={{ marginBottom: '1rem' }} />

                        <h5 >איציק</h5>
                        <h6>מנהל שיווק</h6>
                        <div style={{
                            textAlign: 'right', lineHeight: 1.2
                        }}>
                            <span style={{ fontSize: '0.8rem' }}>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                </div>
            }

            <Footer />
            <FooterSticky />
        </div >
    )
}

export default TheGroup;