import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';


const ContactUsCom = () => {

    const history = useHistory()

    const contact = () => {
        history.push('/contactUs')
    }
    return (
        <div style={{ paddingBottom: '2rem', color: 'white', backgroundColor: '#CBCCC0' }}>
            <div style={{ textAlign: 'right' }}>
                <h3>נשמח לדבר איתכם</h3>
            </div>
            <div style={{ textAlign: 'left', paddingLeft: '10%' }}>
                <Button variant='outlined' style={{ color: 'black' }} onClick={contact}>
                    <span style={{ fontWeight: 'bolder', fontSize: '1.5rem' }}>
                        צרו קשר</span></Button>
            </div>
        </div>
    )
}
export default ContactUsCom;