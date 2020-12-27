import React, { useState } from 'react';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Card } from '@material-ui/core';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

const TheCard = ({ item, styleImg, styleCard }) => {

    return (
        <Card raised dir='rtl' style={styleCard}>
            {item.images != null &&
                <div style={{ position: 'relative' }}>
                    <img className='image-card'
                        style={styleImg}
                        src={item.images[0].url}
                    />
                    <span style={{
                        color: 'black', position: 'absolute', bottom: 0,
                        right: '1rem', fontSize: '1.5rem', fontWeight: '500'
                    }}>₪{item.price}</span>
                </div>
            }

            <div style={{ textAlign: 'right', padding: '2rem 1rem 1rem' }}>
                <div className='crop'>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3ca2c3' }}>{item.name}</span>
                </div>
                <div style={{ margin: '1rem 0' }}>
                    <span >{item.address}, {item.city}</span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'row', paddingTop: '0.5rem' }}>
                    <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                        <MeetingRoomIcon fontSize='medium' />


                        <span style={{ fontSize: '1rem', paddingRight: '0.5rem' }} >{item.rooms} </span>
                    </div>
                    <div style={{ flex: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>

                        <DirectionsCarIcon fontSize='medium' />

                        <span style={{ paddingRight: '0.5rem' }}>
                            {item.parking === true ? 'יש' : 'אין'}
                        </span>
                    </div>
                    <div style={{ flex: 1.5, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <AspectRatioIcon fontSize='medium' />
                        <span style={{ paddingRight: '0.5rem' }}>{item.size}</span>
                    </div>
                    <div style={{ flex: 2 }}></div>

                </div>

            </div>

        </Card >
    )
}

export default TheCard;