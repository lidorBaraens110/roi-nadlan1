import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import * as emailjs from 'emailjs-com';
import firebase from '../firebase';
import { uniqueId } from './screens/adminSide/com/functions';
import { useFirebase } from 'react-redux-firebase';

const ContactCommon = ({ messageType, freeContent, itemName, title, type }) => {
    const theFirebase = useFirebase();
    const [sent, setSent] = useState(false);
    const [userDetails, setUserDetails] = useState({
        check: false, id: uniqueId(),
        fullName: '',
        phone: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({
    })

    useEffect(() => {
        if (typeof itemName !== 'undefined' || itemName != '') {
            setUserDetails(preValue => {
                return { ...preValue, itemName: itemName }
            })
        }
    }, [])
    const handleValidation = () => {
        let formIsValid = true;
        if (!userDetails.fullName) {
            formIsValid = false;
            setErrors(preValue => {
                return { ...preValue, fullName: "לא יכול להיות ריק" }
            })
        }
        if (!userDetails.email) {
            formIsValid = false;
            setErrors(preValue => {
                return { ...preValue, email: "לא יכול להיות ריק" }
            })
        }
        if (typeof userDetails.email !== "undefined") {
            let lastAtPos = userDetails.email.lastIndexOf('@');
            let lastDotPos = userDetails.email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && userDetails.email.indexOf('@@') == -1 && lastDotPos > 2 && (userDetails.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                setErrors(preValue => {
                    return { ...preValue, email: "אימייל לא תקף" }
                })
            }
        }
        return formIsValid;
    }

    const handleUserDetail = (e) => {
        setSent(false);
        const { value, name } = e.target
        setUserDetails(preValue => {
            return { ...preValue, [name]: value }
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        console.log(userDetails)
        if (handleValidation()) {
            theFirebase.database().ref('/messages/' + messageType + '/' + userDetails.id).set(userDetails)
                .then(() => {
                    setUserDetails({ check: false, itemName: itemName, id: uniqueId(), fullName: '', email: '', phone: '', message: '' })
                    setSent(true)
                    console.log('we did it')
                })
                .catch(err => console.log(err))

            emailjs.send('gmail', 'template_8ejmajc', userDetails, process.env.REACT_APP_EMAILJS_KEY)
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            setErrors({})
        } else {
        }
    };
    if (type == 'home') {
        return <form onSubmit={onSubmit} style={{ padding: '1rem 5rem', backgroundColor: '#282020', width: '100%', maxWidth: '100%' }}>
            <fieldset style={{
                width: '100%', maxWidth: '100%', alignItems: 'center', backgroundColor: '#282020', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <span style={{ color: 'white' }}> צרו קשר עכשיו</span>
                <input name='fullName' onChange={handleUserDetail} value={userDetails.fullName} placeholder='שם מלא' />
                {errors.fullName && <span style={{ color: "red" }}>{errors.fullName}</span>}
                <input name='phone' onChange={handleUserDetail} value={userDetails.phone} placeholder='טלפון' />
                <input name='email' type='email' onChange={handleUserDetail} value={userDetails.email} placeholder='מייל' />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                {!sent ? <Button type="submit" variant='outlined' style={{ backgroundColor: 'whitesmoke', borderRadius: '0' }}><span>שלח </span></Button>
                    : <span style={{ color: 'green' }}>נשלח בהצלחה</span>}
            </fieldset>
        </form>
    }

    return (
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>

            <form

                className="user-details"
                onSubmit={onSubmit}
                noValidate
                style={{ padding: '1rem' }}
            >
                <span className='user-details-title' style={{ fontWeight: '700' }}>{title}</span>

                <fieldset style={{ margin: '2rem 0 1rem' }}>
                    <input required style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid gray', borderRadius: '2px' }} name='fullName'
                        onChange={handleUserDetail} value={userDetails.fullName} placeholder='שם מלא' />
                    <br />
                    <span style={{ color: "red" }}>{errors.fullName}</span>
                    <input style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid gray', borderRadius: '2px' }}
                        name='phone' onChange={handleUserDetail} value={userDetails.phone} placeholder='טלפון' />
                    <input required style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid gray', borderRadius: '2px' }}
                        name='email' type='email' onChange={handleUserDetail} value={userDetails.email} placeholder='מייל' />
                    <br />
                    <span style={{ color: "red" }}>{errors.email}</span>
                    {freeContent && <textarea cols="50" rows="8"
                        style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid gray', borderRadius: '2px' }}
                        name='message' type='email' onChange={handleUserDetail} value={userDetails.message}
                        placeholder='טקסט חופשי' />
                    }
                    {!sent ? <Button type="submit"
                        style={{ borderRadius: '0', backgroundColor: 'black', color: 'white', padding: '0.5rem 2rem' }}>
                        <span style={{ fontSize: '1rem' }}>שלח</span></Button>
                        : <div style={{ padding: '0.5rem 2rem' }}>
                            <span style={{ color: 'green', fontSize: '1rem', fontWeight: 'bold' }}>נשלח בהצלחה</span></div>}
                </fieldset>
            </form>

        </div >
    )
}

export default ContactCommon;