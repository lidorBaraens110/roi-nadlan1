import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Footer from '../../footer';

import Header from '../../header';
import Phone from '../../../assets/phone-call.png';
import WhatsApp from '../../../assets/whatsapp.png';
import Mail from '../../../assets/email.png';
import ContactCommon from '../../contactCommon';
import { useLocation } from 'react-router-dom';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import DefaultPage from '../../defaultPage';


const ContactUs = () => {

    useFirebaseConnect([
        'contact'
    ])

    const contact = useSelector(state => state.firebase.data.contact)

    const location = useLocation()
    useEffect(() => {
        console.log(window.location)
        window.scrollTo(0, 0)
    }, [location])

    if (!isLoaded(contact)) {
        return <DefaultPage />
    }
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#eaeaea' }}>

            <Header stat={true} backgroundColor={true} />
            <h3 style={{ margin: '1rem' }}>צור קשר</h3>
            <Grid container style={{ margin: '1rem 0 2rem' }}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a href={`tel:+972${contact.phone}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={Phone} className='contact-icon' />
                            <span className='font-icon-contact'>{contact.phone}</span>
                        </div>
                    </a>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a href={`mailto:${contact.mail}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={Mail} className='contact-icon' />
                            <span className='font-icon-contact'>{contact.mail}</span>
                        </div>
                    </a>
                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                    <a style={{ textDecoration: 'none' }} href={`https://api.whatsapp.com/send?phone=+972${contact.phone}&text=%20${contact.whatsApp}`}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={WhatsApp} className='contact-icon' />
                            <span className='font-icon-contact'>{contact.phone}</span>
                        </div>
                    </a>
                </Grid>
            </Grid>
            <div className='contact-content' style={{ margin: '2rem' }}>
                <span style={{ fontWeight: '500' }}>{contact.sentenceRepresentative}</span>
            </div>
            <ContactCommon freeContent title='ליצירת קשר ולתיאום פגישה' messageType='generalMessages' itemName='' />

            <Footer />
        </div >
    )
}

export default ContactUs;