import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import Header from '../../header';
import Phone from '../../../assets/phone-call.png';
import WhatsApp from '../../../assets/whatsapp.png';
import Mail from '../../../assets/email.png';
import ContactCommon from '../../contactCommon';
import { useLocation } from 'react-router-dom';


const ContactUs = () => {

    const location = useLocation()
    useEffect(() => {
        console.log(window.location)
        window.scrollTo(0, 0)
    }, [location])

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#eaeaea' }}>
            <Header stat={true} backgroundColor={true} />
            <Grid container style={{ margin: '2rem 0' }}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a href='tel:+972509677226' style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={Phone} className='contact-icon' />
                            <span className='font-icon-contact'>0509677226</span>
                        </div>
                    </a>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a href='mailto:roirint10@gmail.com' style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={Mail} className='contact-icon' />
                            <span className='font-icon-contact'>roirint10@gmail.com</span>
                        </div>
                    </a>
                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a style={{ textDecoration: 'none' }} href='https://api.whatsapp.com/send?phone=+972509677226&text=%20שלום הייתי רוצה לשמוע הצעות לדירות לקניה'>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={WhatsApp} className='contact-icon' />
                            <span className='font-icon-contact'>0509677226</span>
                        </div>
                    </a>
                </Grid>
            </Grid>
            <div className='contact-content' style={{ margin: '3rem' }}>
                <span style={{ fontWeight: '500' }}>*אנחנו חוסכים זמן רב ללקוחות בשיווק הדירה ותהליכי המכירה,
                בהצגת הנכס לרוכשים ומציאת רוכשים מתאימים.
                לקונים אנו גם כמובן חוסכים זמן כשאנו יודעים בדיוק איזה נכס מחפשים ובאיזה תקציב
                ומאתרים עבורם את ההזדמנויות הטובות ביותר לפי רצונותיהם.
                    המחיר שאנו גובים כלול במחיר העסקה.</span>
            </div>
            <ContactCommon freeContent title='ליצירת קשר ולתיאום פגישה' messageType='generalMessages' itemName='' />
            {/* <FooterSticky /> */}
            <Footer />
        </div >
    )
}

export default ContactUs;