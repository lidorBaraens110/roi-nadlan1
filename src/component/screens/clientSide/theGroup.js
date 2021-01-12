import React from 'react';
import { Grid } from '@material-ui/core';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';


const TheGroup = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Header stat={true} backgroundColor={true} />
            <div style={{ padding: '10rem' }}>הצווות המנצח</div>
            <Footer />
            <FooterSticky />
        </div>
    )
}

export default TheGroup;