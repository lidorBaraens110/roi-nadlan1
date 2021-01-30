import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

const FullScreenImages = ({ images, index }) => {

    const [ind, setInd] = useState(index)
    useEffect(() => {
        console.log(images, index)
    })
    return (
        <div>
            {images.map((image, i) => {
                return ind == i && <div key={i} style={{ textAlign: 'center', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom', backgroundColor: 'black', width: '100vw', height: '100vh' }}>
                    <Button onClick={() => setInd(preVal => { return preVal + 1 })}><span style={{ fontSize: '5rem', color: 'white' }}>{'<'}</span></Button>
                    <img src={image.url} style={{ width: '60vw', height: 'auto' }} />
                    <Button onClick={() => setInd(preVal => { return preVal - 1 })}><span style={{ fontSize: '5rem', color: 'white' }}>{'>'}</span></Button>
                </div>
            })}
        </div>
    )
}
export default FullScreenImages;