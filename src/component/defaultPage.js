import React from 'react';
import logo from '../assets/loggo.png';

const DefaultPage = () => {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} className='blink-image' />

    </div>
}
export default DefaultPage;