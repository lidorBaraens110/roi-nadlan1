import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Card from '@material-ui/core/Card';

const RecommendedSwipe = ({ pictures }) => {

    const [index, setIndex] = useState(0);

    const picture = [
        'https://firebasestorage.googleapis.com/v0/b/roi-nadlan.appspot.com/o/images%2FWhatsApp%20Image%202020-12-21%20at%2012.49.42.jpeg?alt=media&token=5cdf16bb-27ef-4e7e-89b2-9253342a8007',
        'https://firebasestorage.googleapis.com/v0/b/roi-nadlan.appspot.com/o/images%2FWhatsApp%20Image%202020-12-21%20at%2012.50.00.jpeg?alt=media&token=ec4a0a8f-4156-4576-9a61-f1377c6a4389'
    ]
    const handleSwitching = (e) => {
        setIndex(e)
    }

    return (
        <div style={{ backgroundColor: '#F3F3F1' }}>
            <h1 style={{ padding: '3rem' }}>שמחים לתת שירות</h1>
            <SwipeableViews style={{ backgroundColor: '#F3F3F1' }} enableMouseEvents index={index} onChangeIndex={handleSwitching}>
                {picture.map((pic, i) => {
                    return <Card key={i} style={{ backgroundColor: '#F3F3F1', height: '40rem', width: '100%' }}>
                        <img src={pic} alt='pictures' height='100%' style={{ border: 'solid silver 1px' }} />

                    </Card>

                })}

            </SwipeableViews>
            {picture.map((pic, i) => {
                return <div
                    key={i}
                    id={i}
                    style={{
                        padding: '0.3rem',
                        marginLeft: '0.3rem',
                        display: "inline-block",
                        backgroundColor: i === index ? 'black' : 'white',
                        borderRadius: '50%',
                        border: 'solid black 1px'
                    }} ></div>
            })}
        </div>

    )
}
export default RecommendedSwipe;