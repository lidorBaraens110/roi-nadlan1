import React, { useEffect, useState } from 'react';
import Header from './com/headerAdmin';
import HandleRec from './com/handleRecommned';


const UploadRecommended = () => {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [rec, setRec] = useState({
        name: '',
        content: '',
        img: { url: '', fullPath: '' },
        id: uniqueId()
    })


    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <HandleRec upload={true} rec={rec} />
        </div>

    )
}

export default UploadRecommended;