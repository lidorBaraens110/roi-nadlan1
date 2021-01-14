import React from 'react';
import RoiImg from '../assets/roi-a.jpg';
import AyalaImg from '../assets/ayala-a.jpg';
import ItzikImg from '../assets/itzik-a.jpg';
import { Grid } from '@material-ui/core';

const GroupCom = () => {

    return (
        <Grid container style={{ backgroundImage: `linear-gradient(white,#8BFAE1,white,#8BFAE1)`, padding: '2rem 0', marginTop: '2rem' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <img src={RoiImg} style={{ borderRadius: '100%', height: '200px', width: 'auto' }} />
                <br />
                <span className='header-img-home-group'>
                    רועי רינט
                </span>
                <br />
                <span className='sub-header-img-home-group'>
                    בעלים ומייסד של קבוצת רינט
                </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ margin: '1rem 0' }}>
                <img src={AyalaImg} style={{ borderRadius: '100%', height: '200px', width: 'auto' }} />
                <br />
                <span className='header-img-home-group'>
                    איילת הופמן זוארץ
                </span>
                <br />
                <span className='sub-header-img-home-group'>
                    מתכננת ומעצבת פנים               </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <img src={ItzikImg} style={{ borderRadius: '100%', height: '200px', width: 'auto' }} />
                <br />
                <span className='header-img-home-group'>
                    איציק
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
