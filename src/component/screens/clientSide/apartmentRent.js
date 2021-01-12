import React from 'react';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';

const ApartmentRent = () => {

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <div style={{ padding: '10rem' }}>
                כרגע אין דירות להשכרה
           </div>
            <Footer />
            <FooterSticky />
        </div>
    )
}

export default ApartmentRent;