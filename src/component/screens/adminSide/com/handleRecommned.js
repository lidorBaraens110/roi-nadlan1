import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, Icon, TextField } from '@material-ui/core';
import Header from './headerAdmin';
import firebase, { storage } from '../../../../firebase';

const initialRecommended = ({
    name: '',
    content: '',
    image: {}
})

const HandleRecommended = ({ upload, rec, id }) => {

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

    const [imageAsFile, setImageAsFile] = useState({ name: '', url: '' })
    const [recommended, setRecommended] = useState(rec)

    const handleChange = (e) => {
        console.log(rec.id)
        const { name, value } = e.target;
        console.log(name + ' ' + value)
        setRecommended(preValue => {
            return { ...preValue, [name]: value }
        })
    }
    const handlePictureChange = (e) => {
        const image = e.target.files[0]
        uploadImage(image)

    }

    const uploadImage = (image) => {
        console.log(imageAsFile)
        const uriParts = image.name.split(".");
        const fileType = uriParts[uriParts.length - 1];
        console.log('start of upload')
        let imageId = uniqueId() + '.' + fileType;
        // async magic goes here...
        if (image === '') {
            console.error(`not an image, the image file is a ${typeof (image)}`)
        } else {
            const uploadTask = storage.ref(`/images/${imageId}`).put(image)
            //initiates the firebase side uploading 
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('images').child(imageId).getDownloadURL()
                        .then(fireBaseUrl => {
                            console.log('first')
                            setRecommended(preValue => {
                                return { ...preValue, image: { url: fireBaseUrl, name: imageId } }
                            })
                            setImageAsFile('')
                        })
                })
        }
    }

    const uploadRecommended = () => {
        console.log('upload processing')
        firebase.database().ref(`/recommended/${recommended.id}`).set(recommended)
            .then(() => {
                if (!upload) {
                    history.push('/login/recommended')
                } else {
                    setRecommended(initialRecommended)
                    setRecommended(preVal => { return { ...preVal, id: uniqueId() } })
                    console.log('we did it')
                    alert('הנכס עלה בהצלחה')
                }
            })
            .catch(err => console.log(err))
    }

    // const deletePicture = (image) => {
    //     console.log(image)
    //     const storageRef = storage.ref()
    //     var imageRef = storageRef.child(`images/${image.name}`);
    //     // Delete the file
    //     imageRef.delete().then(function () {
    //         setRecommended(preVal => {
    //             return { ...preVal, image: {} }
    //         })
    //         // File deleted successfully
    //     }).catch(function (error) {
    //         // Uh-oh, an error occurred!
    //     });
    // }

    return (
        <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
            <h1 style={{ marginTop: '2rem' }}>העלאת מכתב המלצה</h1>
            <div style={{ position: 'block', textAlign: 'center', display: 'flex', flexDirection: 'column', padding: '5% 10%' }}>
                <input type='file' onChange={handlePictureChange} />
                <br />
                {recommended.image &&
                    <div style={{ height: '20rem', textAlign: 'center', margin: '1rem 10%' }}>
                        <img height='100%' width='auto' src={recommended.image.url} alt="image tag" />
                        <br />
                        <span> בחר תמונה אחרת לשינוי התמונה</span>

                        {/* <IconButton onClick={() => deletePicture(recommended.image)}><HighlightOffIcon /></IconButton> */}
                    </div>
                }
                <br />
                <TextField variant='outlined' label='שם' name='name' value={recommended.name} onChange={handleChange} />
                <br />
                <textarea cols='40' rows='5' placeholder='תוכן' name='content' value={recommended.content} onChange={handleChange} />


                {/* <br /> */}
                {/* <button onClick={uploadImage}>העלה תמונה</button> */}
            </div>


            <button onClick={uploadRecommended}>{upload ? 'העלה את ההמלצה' : 'ערוך'} </button>

        </div>

    )
}

export default HandleRecommended;