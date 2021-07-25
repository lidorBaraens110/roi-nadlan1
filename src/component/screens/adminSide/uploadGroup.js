import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderLogin from './com/headerAdmin';

import HandleGroup from './com/handleGroup';

const AddToGroup = () => {

    const type = useLocation().state;
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [person, setPerson] = useState({
        name: '',
        role: '',
        des: '',
        img: '',
        id: uniqueId()
    })

    return (
        <>
            <HeaderLogin />
            <HandleGroup upload={true} thePerson={person} type={type} />
        </>

    )
}

export default AddToGroup;