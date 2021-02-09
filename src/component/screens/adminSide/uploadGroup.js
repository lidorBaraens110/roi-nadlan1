import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import HeaderLogin from './com/headerAdmin';
import DefaultPage from '../../defaultPage';
import firebase from '../../../firebase';
import HandleGroup from './com/handleGroup';

const initialPerson = {
    name: '',
    role: '',
    des: '',
    img: { url: '', fullPath: '' },
}

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
    const theFirebase = useFirebase();
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