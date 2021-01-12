import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import * as emailjs from 'emailjs-com';
import firebase from '../firebase';

const ContactCommon = ({ messageType, freeContent, itemName, title }) => {


    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }

    const [userDetails, setUserDetails] = useState({
        check: false
    })
    const [errors, setErrors] = useState({
    })

    useEffect(() => {
        if (itemName !== undefined || itemName !== '') {
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
        const { value, name } = e.target
        setUserDetails(preValue => {
            return { ...preValue, [name]: value }
        })
    }
    const onSubmit = e => {

        e.preventDefault();
        if (handleValidation()) {
            firebase.database().ref('/messages/' + messageType + '/' + uniqueId()).set(userDetails)
                .then(() => {
                    setUserDetails({})
                    console.log('we did it')
                })
                .catch(err => console.log(err))

            emailjs.send('gmail', 'template_8ejmajc', userDetails, process.env.REACT_APP_EMAILJS_KEY)
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            alert("נשלח בהצלחה");
            setErrors({})
        } else {
            alert("יש למלא פרטים נכונים")
        }
    };

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>
            <div style={{ padding: '0 10% ' }}>
                <form
                    className="user-details"
                    onSubmit={onSubmit}
                    noValidate
                >
                    <span className='apartment-page-title' style={{ padding: '1rem', fontWeight: '700' }}>{title}</span>
                    <fieldset>
                        <input required style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0' }} name='fullName'
                            onChange={handleUserDetail} value={userDetails.fullName} placeholder='שם מלא' />
                        <br />
                        <span style={{ color: "red" }}>{errors.fullName}</span>
                        <input style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0' }} name='phone' onChange={handleUserDetail} value={userDetails.phone} placeholder='טלפון' />
                        <input required style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0' }} name='email' type='email' onChange={handleUserDetail} value={userDetails.email} placeholder='מייל' />
                        <br />
                        <span style={{ color: "red" }}>{errors.email}</span>
                        {freeContent && <textarea cols="40" rows="5" style={{ width: '90%', padding: '0.5rem', margin: '0.5rem 0' }} name='message' type='email' onChange={handleUserDetail} value={userDetails.message} placeholder='טקסט חופשי' />
                        }
                        <Button type="submit" style={{ borderRadius: '0', backgroundColor: 'black', color: 'white', padding: '0.5rem 2rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>שלח</span></Button>
                    </fieldset>
                </form>

            </div>
        </div >
    )
}

export default ContactCommon;