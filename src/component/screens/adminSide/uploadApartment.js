import React, { useState, useEffect } from 'react';
import HeaderLogin from './com/headerAdmin';
import HandleItem from './com/handleItem';
import { useParams } from 'react-router-dom';


const UploadSell = () => {

    const { id } = useParams()

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }

    const [item, setItem] = useState({
        itemId: uniqueId(),
        name: '',
        address: '',
        city: '',
        size: '',
        floor: '',
        rooms: '',
        enterDate: '',
        price: '',
        parking: false,
        balcony: false,
        elevator: false,
        sell: false,
        freeContext: '',
        favorite: '',
        favorites: [],
        lat: '',
        lon: '',
        avatarImage: { url: '', fullPath: '' },
        images: []
    })

    return (
        <div>
            <HeaderLogin />
            <div style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', padding: '0 10%', marginBottom: '3rem', textAlign: 'center' }} >
                <br />
                <div >
                    <h1>העלאת נכס</h1>
                    <br />
                    <HandleItem TheItemm={item} upload={true} UpButtonSpan={'העלה נכס'} type={id} popUpSuccessSpan={'הנכס עלה בהצחלה!!'} />
                </div>

            </div>
        </div >
    )
}


export default UploadSell;