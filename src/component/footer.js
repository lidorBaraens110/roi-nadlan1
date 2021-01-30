import React from 'react';
// import FacebookIcon from '@material-ui/icons/Facebook';
import { Grid, makeStyles, IconButton, SvgIcon } from '@material-ui/core';
import WazeIcon from '../assets/waze.png';
import FacebookIcon from '../assets/facebook.png';
import WhatsAppIcon from '../assets/whatsappFooter.png';

const useStyle = makeStyles(theme => ({

    footer: {
        color: 'gray',
        lineHeight: '2',
        padding: '2rem 15% ',
        fontSize: '0.8rem'

    }
}));

const Footer = () => {
    const address = {
        lat: 31.992670,
        lon: 34.767990
    }
    const whatsapp = 'https://api.whatsapp.com/send?phone=+972509677226&text=%20שלום הייתי רוצה לשמוע הצעות לדירות לקניה'
    const facebookPage = 'https://www.facebook.com/%D7%A8%D7%95%D7%A2%D7%99-%D7%A8%D7%99%D7%A0%D7%98-%D7%99%D7%95%D7%A2%D7%A5-%D7%95%D7%9E%D7%A9%D7%95%D7%95%D7%A7-%D7%A0%D7%93%D7%9C%D7%9F-375132793057269'
    const classes = useStyle();
    return (
        <div style={{ backgroundColor: '#181615', paddingBottom: '1rem' }}>
            <Grid className={classes.footer}
                container >
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h5 style={{ color: 'white' }} >מיקום המשרד</h5>
                    <span > סחרוב 3, ראשון לציון, </span>
                    <br />
                    <span>מגדלי סטוצ'י 1</span>
                </Grid>
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>

                    <h5 style={{ color: 'white' }}>שעות עבודה</h5>
                    <span>ימים א-ה 08:00-22:00</span>
                    <br />
                    <span>יום ו: 08:00-15:00</span>

                </Grid>
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h5 style={{ color: 'white', }}>ליצירת קשר</h5>
                    <span>
                        רועי :0509677226
                    </span>
                    <br />
                    <span>
                        אימייל: roirint10@gmail.com
                    </span>
                </Grid>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >

                <IconButton href={facebookPage} target="_blank">
                    <img src={FacebookIcon} />
                </IconButton>
                <IconButton
                    href={whatsapp}
                    target="_blank">
                    <img src={WhatsAppIcon} />
                </IconButton>
                <IconButton
                    href={`https://waze.com/ul?ll=${address.lat},${address.lon}&navigate=yes`}
                    target="_blank">
                    <img src={WazeIcon} />
                </IconButton>

            </div>
            {/* <img className='footer-map' src='https://www.d.co.il/StaticMap/80086944/893/230.jpg?c=34.766944%2C31.993037' /> */}
            <hr style={{ padding: '0', margin: '1rem 0 0' }} />
            <span style={{ fontSize: '0.8rem' }}>2021 lidor baranes&#169;</span>

        </div >
    )
}

export default Footer;