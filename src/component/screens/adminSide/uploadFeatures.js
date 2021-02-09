import React, { useState } from 'react';
import Header from './com/headerAdmin';
import HandleFeatures from './com/handleFeatures';



function UploadFeatures() {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [feature, setFeature] = useState({
        title: '',
        des: '',
        icon: { url: '', fullPath: '' },
        id: uniqueId()
    })

    return (
        <>
            <Header />
            <HandleFeatures upload={false} theFeature={feature} />
        </>
    );
}

export default UploadFeatures;