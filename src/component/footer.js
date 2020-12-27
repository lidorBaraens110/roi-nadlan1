import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';



// const LocationPin = ({ text }) => (
//     <div >
//         <Icon><LocationOnIcon fontSize='large' style={{ color: 'red' }} /> </Icon>
//         <p style={{ fontSize: '1.5rem', color: 'blue', fontWeight: 'bold' }}>{text}</p>
//     </div>
// )
const useStyle = makeStyles(theme => ({

    footer: {
        backgroundColor: '#2B3037',
        color: 'gray',
        lineHeight: '2.5',
        padding: '0 10% 0 10%',
        marginTop: '5%'
    },
    button: { padding: '1rem 2rem', marginTop: '1rem', backgroundColor: 'black', color: 'white', border: 'solid 1px #white', fontSize: '1rem', fontWeight: 'bold' }
}));

const Footer = () => {
    const facebookPage = 'https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/%D7%A8%D7%95%D7%A2%D7%99-%D7%A8%D7%99%D7%A0%D7%98-%D7%99%D7%95%D7%A2%D7%A5-%D7%95%D7%9E%D7%A9%D7%95%D7%95%D7%A7-%D7%A0%D7%93%D7%9C%D7%9F-375132793057269'
    const classes = useStyle();
    return (
        <div style={{ backgroundColor: '#2B3037' }}>
            <Grid className={classes.footer} container spacing={10} style={{ fontSize: '1.2rem' }}>
                <Grid item
                    xl={6} lg={6} md={6} s={12} xs={12}>
                    <h2 style={{ color: 'white' }} >מיקום</h2>
                    <span > סחרוב 3 ראשון לציון מגלי סטוצי</span>
                    <br />
                    <h3 style={{ color: 'white', paddingTop: '3rem' }}>שעות עבודה</h3>
                    <span>ימים א-ה 08:00-22:00</span>
                    <br />
                    <span>יום ו: 08:00-15:00</span>

                </Grid>
                <Grid item
                    xl={6} lg={6} md={6} s={12} xs={12}>
                    <h2 style={{ color: 'white' }}>ליצירת קשר</h2>
                    רועי :0509677226
                    <br />
                    אימייל: roirint10@gmail.com
                </Grid>

            </Grid>
            <div style={{ padding: '2rem' }} >
                <IconButton href={facebookPage} target="_blank">
                    <FacebookIcon color='primary' style={{ fontSize: '4rem' }} />
                </IconButton>
                <br />
                <span style={{ color: 'white' }}> עקבו אחרינו</span>

            </div>
            <div style={{ height: '30vh' }}>
                <img src='https://www.d.co.il/StaticMap/80086944/893/230.jpg?c=34.766944%2C31.993037' />
            </div>
        </div >
    )
}

export default Footer;