import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';


const ContactUsCom = () => {

    const history = useHistory()

    const contact = () => {
        history.push('/contactUs')
    }
    return (
        <div style={{
            padding: '1rem 10%', color: 'white', backgroundColor: '#9DA1A3',
            display: 'flex', justifyContent: 'space-between', flexDirection: 'row'
        }}>

            <h4>נשמח לדבר איתכם</h4>

            <Button variant='contained' style={{ color: 'black' }} onClick={contact}>
                <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                    צור קשר</span></Button>

        </div>
    )
}
export default ContactUsCom;