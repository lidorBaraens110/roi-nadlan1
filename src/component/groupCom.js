import React from 'react';
import RoiImg from '../assets/roi-a.jpg';
import AyalaImg from '../assets/ayala-a.jpg';
import ItzikImg from '../assets/itzik-a.jpg';
import { Grid } from '@material-ui/core';

const GroupCom = () => {

    return (
        <Grid container spacing={4} style={{
            margin: 0, width: '100%', backgroundImage: `linear-gradient(120deg,white,#3ca2c3,white)`, padding: '2rem 0', marginTop: '2rem'
        }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='group-com-roi'  >
                <img src={RoiImg} className='image-group-com' />
                <br />
                <span className='header-img-home-group'>
                    רועי רינט
                </span>
                <br />
                <span className='sub-header-img-home-group'>
                    בעלים ומייסד של קבוצת רינט
                </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <img src={AyalaImg} className='image-group-com' />
                <br />
                <span className='header-img-home-group'>
                    איילת הופמן זוארץ
                </span>
                <br />
                <span className='sub-header-img-home-group'>
                    מתכננת ומעצבת פנים</span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <img src={ItzikImg} className='image-group-com' />
                <br />
                <span className='header-img-home-group'>
                    איציק שילה
                </span>
                <br />
                <span className='sub-header-img-home-group'>
                    מנהל שיווק
                </span>
            </Grid>
        </Grid>
    )
}
export default GroupCom;
