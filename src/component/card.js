import React, { useEffect, useState } from 'react';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Button, Card } from '@material-ui/core';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

const TheCard = ({ item, imgClass, onClick, cardName, type }) => {

    useEffect(() => {
        console.log(type)
    }, [type])
    return (
        <Card dir='rtl' className={cardName} style={{ borderRadius: 0, padding: '0' }}>
            {item.images != null &&
                <div style={{ position: 'relative' }}>
                    <img className={imgClass} onClick={() => onClick(item, type)}
                        src={item.images[0] ? item.images[0].url : item.images[1].url}
                    />
                    {item.sell !== undefined && <div style={{
                        position: 'absolute', top: 0, left: 0,
                        padding: '0.25rem 0.5rem', backgroundColor: !item.sell ? 'green' : 'red'
                        , fontWeight: '400', color: 'white', fontSize: '0.8rem'
                    }}>
                        {item.sell ? 'נמכר' : 'למכירה'}
                    </div>
                    }
                    <span style={{
                        color: 'black', position: 'absolute', bottom: '0.5rem', padding: '0 0.2rem',
                        fontSize: '0.8rem', right: '0.5rem', fontWeight: '500', backgroundColor: 'black', color: 'white'
                    }}>₪{item.price}</span>
                </div>
            }

            <div style={{ textAlign: 'right', padding: '0.5rem' }}>
                {/* <div className='crop'>
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#3ca2c3' }}>
                        {item.name}
                    </span>
                </div> */}
                <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#3ca2c3' }}>
                    <span >{item.address}, {item.city}</span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1.5, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <MeetingRoomIcon fontSize='inherit' />
                        <span style={{ fontSize: '0.8rem', paddingRight: '0.2rem', }} >{item.rooms} </span>
                    </div>
                    <div style={{ flex: 1.5, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>

                        <DirectionsCarIcon fontSize='inherit' />

                        <span style={{ paddingRight: '0.2rem', fontSize: '0.8rem' }}>
                            {item.parking === true ? 'יש' : 'אין'}
                        </span>
                    </div>
                    <div style={{ flex: 1.5, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <AspectRatioIcon fontSize='inherit' />
                        <span style={{ paddingRight: '0.2rem', fontSize: '0.8rem' }}>{item.size} מ"ר</span>
                    </div>
                    <div style={{ flex: 2, textAlign: 'left' }}>
                        <Button style={{ backgroundColor: '#3ca2c3', color: 'white', fontSize: '0.7rem' }} onClick={() => onClick(item, type)}>{'לפרטים>'}</Button></div>

                </div>

            </div>

        </Card >
    )
}

export default TheCard;