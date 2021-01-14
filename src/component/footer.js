import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Grid, makeStyles, IconButton } from '@material-ui/core';


const useStyle = makeStyles(theme => ({

    footer: {

        color: 'gray',
        lineHeight: '2.5',
        padding: '0 15% 0 '

    }
}));

const Footer = () => {
    const facebookPage = 'https://www.facebook.com/sharer/sharer.php?u=www.rind-nadlan.com&display=popup'
    const classes = useStyle();
    return (
        <div style={{ backgroundColor: '#2B3856', paddingBottom: '2rem' }}>
            <Grid className={classes.footer}
                container >
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h4 style={{ color: 'white' }} >מיקום</h4>
                    <span > סחרוב 3, ראשון לציון, </span>
                    <br />
                    <span>מגדלי סטוצ'י 1</span>
                </Grid>
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>

                    <h4 style={{ color: 'white' }}>שעות עבודה</h4>
                    <span>ימים א-ה 08:00-22:00</span>
                    <br />
                    <span>יום ו: 08:00-15:00</span>

                </Grid>
                <Grid item
                    style={{ padding: '1rem 0 0' }}
                    xl={4} lg={4} md={4} s={12} xs={12}>
                    <h4 style={{ color: 'white' }}>ליצירת קשר</h4>
                    רועי :0509677226
                    <br />
                    אימייל: roirint10@gmail.com
                </Grid>
            </Grid>
            <div style={{ padding: '2rem' }} >
                <IconButton href={facebookPage} target="_blank">
                    <FacebookIcon style={{ fontSize: '3rem', backgroundColor: 'white', color: 'blue', padding: '0', borderRadius: '10%' }} />
                </IconButton>
                <br />
                <span style={{ color: 'white' }}>שתפו אותנו</span>

            </div>
            <img className='footer-map' src='https://www.d.co.il/StaticMap/80086944/893/230.jpg?c=34.766944%2C31.993037' />
            <hr style={{ padding: '0', margin: '0' }} />
            <span style={{ fontSize: '0.8rem' }}>2021 lidor baranes&#169;</span>

        </div >
    )
}

export default Footer;