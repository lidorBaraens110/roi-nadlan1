import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderLogin from './com/headerAdmin';
import { Grid, Button, Typography, TextField, List, ListItem } from '@material-ui/core';
import firebase from '../../../firebase';
import { useFirebaseConnect, isLoaded, isEmpty, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Check, PhotoSizeSelectLargeOutlined } from '@material-ui/icons';
import { uniqueId } from './com/functions';
import { object } from 'firebase-functions/lib/providers/storage';

const Home = () => {

    const history = useHistory()
    const theFirebase = useFirebase()
    useFirebaseConnect([
        'contact'
    ])
    const [details, setDetails] = useState({
        address: '',
        opening: '',
        mail: '',
        facebook: '',
        phone: '',
        whatsApp: '',
        lat: '', lon: '',
        sentenceRepresentative: '',
        logo: { url: '', fullPath: '' },
        mainPhoto: { url: '', fullPath: '' },
        mainSentence: '',
        subSentence: '',
    })

    const [edit, setEdit] = useState(false);
    const [load, seLoad] = useState(false);
    const contact = useSelector(state => state.firebase.data.contact);
    const handleUpdate = () => {
        firebase.database().ref('contact').set(details)
            .then(() => {
                setEdit(preVal => !preVal)
                console.log('update')
            })
            .catch(err => console.log(err))
    }

    const handleChangeImage = (e) => {
        let lastPhotoPath;
        const { name } = e.target;
        if (name == 'logo') {
            lastPhotoPath = details.logo.fullPath;
        } else {
            lastPhotoPath = details.mainPhoto.fullPath;
        }
        const file = e.target.files[0]
        const imageId = uniqueId();

        theFirebase.uploadFile(`images/`, file, 'contactPhoto', {
            documentId: (res, x, y, url) => {
                setDetails(preVal => {
                    console.log('setImage in state')
                    return { ...preVal, [name]: { url: url, fullPath: res.ref.fullPath } }
                })
            }, name: imageId
        }).then((res) => {
            console.log('gj')
            console.log('setState again')
            setDetails(preVal => { return { ...preVal } })
        }).then(() => {
            console.log(lastPhotoPath)
            if (lastPhotoPath !== '') {
                console.log(lastPhotoPath)
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).then(() => {
            console.log('delete photo')
        }).catch(err => console.log(err))
            .catch(err => console.log(err))
    }


    useEffect(() => {

        if (isLoaded(contact)) {
            if (!isEmpty(contact)) {
                console.log('loaded')
                setDetails(contact)
            }
        }
    }, [contact])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(preVal => {
            return { ...preVal, [name]: value }
        })
    }
    // const check = () => {
    //     let x = Object.keys(details).filter((detail, k) => {
    //         console.log()
    //     })
    // }

    if (!isLoaded(contact)) {
        return <div>loading..</div>
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <HeaderLogin />
            <h3 style={{ margin: '1rem' }}> פרטי מנהל</h3>
            {/* <button onClick={() => check()}>bliblu</button> */}

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'row' }}>
                <List style={{ textAlign: 'right' }}>
                    <ListItem >
                        <TextField fullWidth disabled={!edit ? true : false} label='כתובת המשרד' variant='outlined' name='address' value={details.address} onChange={handleChange} />
                    </ListItem>
                    <ListItem>
                        <TextField fullWidth disabled={!edit ? true : false} label='שעות פתיחה' variant='outlined' name='opening' value={details.opening} onChange={handleChange} />
                    </ListItem>
                    <ListItem>
                        <TextField fullWidth disabled={!edit ? true : false} type='mail' label='מייל' variant='outlined' name='mail' value={details.mail} onChange={handleChange} />
                    </ListItem>
                    <ListItem >
                        <TextField fullWidth disabled={!edit ? true : false} label='טקסט שישלח לווטסאפ' variant='outlined' name='whatsApp' value={details.whatsApp} onChange={handleChange} />
                    </ListItem>
                    <ListItem >
                        <TextField fullWidth disabled={!edit ? true : false} label='כתובת פייסבוק' variant='outlined' name='facebook' value={details.facebook} onChange={handleChange} />
                    </ListItem>
                    <ListItem >
                        <TextField fullWidth disabled={!edit ? true : false} label='טלפון' type='tel'
                            pattern="[0-9]{3}[0-9]{7}"
                            variant='outlined' name='phone' value={details.phone} onChange={handleChange} />
                    </ListItem>
                    <span>נקודות ציון לוויז</span>
                    <ListItem >

                        <TextField style={{ marginRight: '1rem' }} disabled={!edit ? true : false} label='קו רוחב' variant='outlined' name='lat' value={details.lat} onChange={handleChange} />
                        <TextField style={{ marginRight: '1rem' }} disabled={!edit ? true : false} label='קו אורך' variant='outlined' name='lon' value={details.lon} onChange={handleChange} />
                    </ListItem>
                    <span> משפט יצוגי לצור קשר</span>
                    <ListItem >

                        <textarea disabled={!edit ? true : false} style={{ marginRight: '1rem' }} rows='5' cols='50' value={details.sentenceRepresentative} onChange={handleChange} name='sentenceRepresentative' placeholder='משפט ייצוגי'></textarea>
                    </ListItem>
                    <span>לוגו</span>
                    <ListItem style={{ display: 'flex', flexDirection: 'column' }}>

                        {edit && <input type='file' variant='outlined' name='logo' onChange={handleChangeImage} />}
                        {details.logo == '' ?
                            <span>כרגעעע אין תמונת לוגו</span> :
                            <img src={details.logo.url} style={{ height: 'auto', width: '10rem' }} />}
                    </ListItem>
                    <span>התמונה בדף הראשי</span>
                    <ListItem tyle={{ display: 'flex', flexDirection: 'column' }}>


                        {edit ? <TextField type='file' variant='outlined' name='mainPhoto' onChange={handleChangeImage} />
                            :
                            details.mainPhoto && <img style={{ height: '10rem', width: 'auto' }} src={details.mainPhoto.url} />
                        }
                    </ListItem>
                    <span>הכיתוב שנמצא בתמונה בדף הראשי</span>
                    <ListItem>

                        <TextField disabled={!edit ? true : false} variant='outlined' name='mainSentence' label='משפט ראשי' value={details.mainSentence} onChange={handleChange} />
                        <TextField disabled={!edit ? true : false} variant='outlined' name='subSentence' label='משפט משני' value={details.subSentence} onChange={handleChange} />
                    </ListItem>

                </List>

                <List style={{
                    position: 'fixed', left: '10rem', top: '10rem'
                }}>
                    {!edit ?
                        <ListItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Button onClick={() => setEdit(preVal => !preVal)} variant='contained'> ערוך את המידע</Button>

                        </ListItem>

                        : <ListItem style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography>אתה כרגע במצב עריכה בלחיצה על עדכן הפרטים יישמרו</Typography>
                            <Button onClick={handleUpdate} variant='contained'>עדכן</Button>
                        </ListItem>
                    }
                </List>
            </div>
            <h1>תמונה ראשית עם כיתוב בפנים</h1>
            <div className='sub-header'>
                <div className='logo-subheader'>
                    <h1 className='sub-h1'>{details.mainSentence}</h1>
                    <h3 className='sub-h3'>{details.subSentence}</h3>
                </div>
                {details.mainPhoto && <img src={details.mainPhoto.url} className='image-subheader' />}
            </div>
            <button style={{ marginBottom: '2rem' }} onClick={() => console.log(details)}>פרטים</button>

        </div >
    )
}


export default Home;