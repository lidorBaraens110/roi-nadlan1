import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { useFirebase } from 'react-redux-firebase';
import firebase from '../../../../firebase';
import { uniqueId } from './functions';

const initialPerson = {
    name: '',
    role: '',
    des: '',
    img: { fullPath: '', url: '' },
}
const HandleGroup = ({ upload, thePerson, type }) => {

    const history = useHistory();


    const theFirebase = useFirebase();

    const [person, setPerson] = useState(thePerson)

    const addImage = (e) => {
        let lastPhotoPath = person.img.fullPath
        const file = e.target.files[0]

        let imageId = uniqueId();

        theFirebase.uploadFile('images', file, 'groupImg', {
            documentId: (res, x, y, url) => {
                //get the full path
                console.log('res', res.ref.fullPath)
                //get download url
                setPerson(preVal => {
                    return { ...preVal, img: { fullPath: res.ref.fullPath, url: url } }
                })
                console.log(url)
            }, name: imageId
        }).then(res => {
            setPerson(preVal => { return { ...preVal } })
            console.log('then', res)

        }).then(() => {
            if (!upload) {
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).catch(err => console.log(err))
            .catch((err) => console.log(err))

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson(pre => {
            return { ...pre, [name]: value }
        })
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
                    if (!upload || type == 'manager') {
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