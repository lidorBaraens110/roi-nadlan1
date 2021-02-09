import React, { useEffect, useState } from 'react';
// import FacebookIcon from '@material-ui/icons/Facebook';
import { Grid, makeStyles, IconButton, SvgIcon, CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import WazeIcon from '../assets/waze.png';
import FacebookIcon from '../assets/facebook.png';
import WhatsAppIcon from '../assets/whatsappFooter.png';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';


const useStyle = makeStyles(theme => ({

    footer: {
        color: 'gray',
        lineHeight: '2',
        padding: '2rem 20% ',
        fontSize: '0.8rem',
        textAlign: 'center',
        margin: '0',
        width: '100%'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Footer = () => {

    useFirebaseConnect([
        'contact'
    ])

    const contact = useSelector(state => state.firebase.data.contact);
    const [opening, setOpening] = useState([])
    const address = {
        lat: 31.992670,
        lon: 34.767990
    }
    const whatsapp = 'https://api.whatsapp.com/send?phone=+972509677226&text=%20שלום הייתי רוצה לשמוע הצעות לדירות לקניה'
    const facebookPage = 'https://www.facebook.com/%D7%A8%D7%95%D7%A2%D7%99-%D7%A8%D7%99%D7%A0%D7%98-%D7%99%D7%95%D7%A2%D7%A5-%D7%95%D7%9E%D7%A9%D7%95%D7%95%D7%A7-%D7%A0%D7%93%D7%9C%D7%9F-375132793057269'
    const classes = useStyle();

    useEffect(() => {
        let newOpening;
        if (isLoaded(contact) && !isEmpty(contact)) {
            newOpening = contact.opening.split(',')
            setOpening(newOpening)
        }
    }, [contact])
    if (!isLoaded(contact)) {
        return <Backdrop className={classes.backdrop} open >
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    if (isEmpty(contact)) {
        return <div style={{ backgroundColor: '#181615', paddingBottom: '1rem' }}>
        </div>
    }
    return (
        <div style={{ backgroundColor: '#181615', paddingBottom: '1rem', textAlign: 'center' }}>
            <Grid className={classes.footer}
                spacing={5}
                container >
                <Grid item
                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h5 style={{ color: 'white' }} >מיקום המשרד</h5>
                    {contact.address && <span > {contact.address}</span>}
                </Grid>
                <Grid item

                    xl={4} lg={4} md={4} s={12} xs={12}>

                    <h5 style={{ color: 'white' }}>שעות עבודה</h5>

                    <span >{opening[0]}</span>
                    <br />
                    <span >{opening[1]}</span>

                </Grid>
                <Grid item

                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h5 style={{ color: 'white', }}>ליצירת קשר</h5>
                    <span>
                        רועי :{contact.phone}
                    </span>
                    <br />
                    <span>
                        אימייל: {contact.mail}
                    </span>
                </Grid>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >

                <IconButton href={contact.facebook} target="_blank">
                    <img src={FacebookIcon} />
                </IconButton>
                <IconButton
                    href={`https://api.whatsapp.com/send?phone=+972${contact.phone}&text=${contact.whatsApp}`}
                    target="_blank">
                    <img src={WhatsAppIcon} />
                </IconButton>
                <IconButton
                    href={`https://waze.com/ul?ll=${contact.lat},${contact.lon}&navigate=yes`}
                    target="_blank">
                    <img src={WazeIcon} />
                </IconButton>

            </div>
            {/* <img className='footer-map' src='https://www.d.co.il/StaticMap/80086944/893/230.jpg?c=34.766944%2C31.993037' /> */}
            <hr style={{ padding: '0', margin: '1rem 0 0' }} />
            <span style={{ fontSize: '0.8rem', color: '#7a7a7a' }}>2021 lidor baranes&#169;</span>

        </div >
    )
}

export default Footer;