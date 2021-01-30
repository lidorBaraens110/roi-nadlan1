import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import HeaderLogin from './headerAdmin';
import DefaultPage from '../../../defaultPage';
import firebase from '../../../../firebase';

const initialPerson = {
    name: '',
    role: '',
    des: '',
    img: '',
}
const HandleGroup = ({ upload, thePerson, type }) => {

    const history = useHistory();

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

    const [person, setPerson] = useState(thePerson)

    const addImage = (e) => {
        const { fullPath } = person.img;
        const file = e.target.files[0]

        theFirebase.uploadFile('images', file, 'groupImg', {
            documentId: (res, x, y, url) => {
                //get the full path
                console.log('res', res.ref.fullPath)
                //get download url
                setPerson(preVal => {
                    return { ...preVal, img: { fullPath: res.ref.fullPath, url: url } }
                })
                console.log(url)
            }
        }).then(res => {
            setPerson(preVal => { return { ...preVal } })
            console.log('then', res)
        }).then(() => {
            // if (!upload) {
            //     handleUpload()
            // }
        }).then(() => {
            // theFirebase.deleteFile(fullPath).then(() => {
            //     console.log('delete the previous image')
            // }).catch((err) => console.log(err))
            // })
        }).catch((err) => console.log(err))

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson(pre => {
            return { ...pre, [name]: value }
        })
    }
    const handleEdit = () => {
        console.log('edit')
    }

    const handleUpload = () => {
        ///upload person
        firebase.database().ref(type == 'group' || type == 'collaboration' ? `/${type}/${person.id}` : `/${type}`).set(person)
            .then(() => {
                setPerson(initialPerson)
                setPerson(preValue => {
                    return { ...preValue, id: uniqueId() }
                })
                setTimeout(() => {
                    if (!upload) {
                        history.push('/login/group')
                    }
                }, 0)

                console.log('we did it')
                alert('עלה בהצלחה')

            })
            .catch(err => console.log(err))

    }
    return (
        <>

            <div style={{ padding: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>


                <input type='file' onChange={addImage} />
                <br />

                {person.img !== '' &&
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ height: 'auto', width: '20rem' }} src={person.img.url} />
                        <br />
                        <span style={{ border: '1px solid black' }} >להחלפת תמונה בחר קובץ חדש </span>
                    </div>
                }

                <br />

                <div style={{ textAlign: 'right' }}>
                    <TextField variant='outlined' label='שם' name='name' value={person.name} onChange={handleChange} />
                    <TextField variant='outlined' label='תפקיד' name='role' value={person.role} onChange={handleChange} />
                </div>
                <br />
                <textarea rows={5} cols={50} name='des' onChange={handleChange} value={person.des} placeholder='תיאור' />
                <br />
                <button onClick={handleUpload}>{upload ? 'הוסף' : 'עדכן'}</button>
                <button onClick={() => console.log(person)}>פרטים</button>
            </div>
        </>

    )
}

export default HandleGroup;