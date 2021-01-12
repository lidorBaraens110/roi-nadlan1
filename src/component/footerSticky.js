import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { IconButton } from '@material-ui/core';

const FooterSticky = () => {
    // const whatsApp = () => {
    //     console.log('safjb')
    // }
    const facebookSite = 'https://www.facebook.com/%D7%A8%D7%95%D7%A2%D7%99-%D7%A8%D7%99%D7%A0%D7%98-%D7%99%D7%95%D7%A2%D7%A5-%D7%95%D7%9E%D7%A9%D7%95%D7%95%D7%A7-%D7%A0%D7%93%D7%9C%D7%9F-375132793057269'


    // %20 mean space in link
    // If you already had an array then you just join them with '%20'
    // easy right


    return (
        <div
            style={{
                position: 'fixed',
                left: 0,
                bottom: 2,
                width: '100%',
                textAlign: 'center'
            }}
        // style = {{ position: 'sticky', bot: 0, display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
        >
            <IconButton style={{ padding: 0 }} href={facebookSite}>
                <FacebookIcon style={{ color: 'blue' }} />
            </IconButton>
            <IconButton style={{ padding: 0 }}
                href='https://api.whatsapp.com/send?phone=+972509677226&text=%20שלום הייתי רוצה לשמוע הצעות לדירות לקניה'>
                <WhatsAppIcon style={{ color: 'green' }} />
            </IconButton>
        </div>
    )
}
export default FooterSticky;