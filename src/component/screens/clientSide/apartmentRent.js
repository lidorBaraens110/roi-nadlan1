import React from 'react';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';

const ApartmentRent = () => {

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <div style={{ padding: '10rem' }}>
                בקרוב דירות יהיו דירות חדשות ומפתות
           </div>
            <Footer />
            {/* <FooterSticky /> */}
        </div>
    )
}

export default ApartmentRent;