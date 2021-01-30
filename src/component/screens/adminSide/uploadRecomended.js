import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, Icon, TextField } from '@material-ui/core';
import Header from './com/headerAdmin';
import firebase, { storage } from '../../../firebase';
import HandleRec from './com/handleRecommned';

const initialRecommended = ({
    name: '',
    content: '',
    image: {}
})

const UploadRecommended = () => {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [rec, setRec] = useState({
        name: '',
        content: '',
        image: {},
        id: uniqueId()
    })


    // const [recId, setRecId] = useState(uniqueId())
    // const [imageAsFile, setImageAsFile] = useState({ name: '', url: '' })
    // const [recommended, setRecommended] = useState({
    //     name: '',
    //     content: '',
    //     image: {}
    // })

    // useEffect(() => {
    //     console.log(imageAsFile)
    // })
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setRecommended(preValue => {
    //         return { ...preValue, [name]: value }
    //     })
    // }
    // const handlePictureChange = (e) => {
    //     const image = e.target.files[0]
    //     setImageAsFile(image)
    // }

    // const uploadImage = () => {
    //     console.log(imageAsFile)
    //     const uriParts = imageAsFile.name.split(".");
    //     const fileType = uriParts[uriParts.length - 1];
    //     console.log('start of upload')
    //     let imageId = uniqueId() + '.' + fileType;
    //     // async magic goes here...
    //     if (imageAsFile === '') {
    //         console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    //     }
    //     const uploadTask = storage.ref(`/images/${imageId}`).put(imageAsFile)
    //     //initiates the firebase side uploading 
    //     uploadTask.on('state_changed',
    //         (snapShot) => {
    //             //takes a snap shot of the process as it is happening
    //             console.log(snapShot)
    //         }, (err) => {
    //             //catches the errors
    //             console.log(err)
    //         }, () => {
    //             // gets the functions from storage refences the image storage in firebase by the children
    //             // gets the download url then sets the image from firebase as the value for the imgUrl key:
    //             storage.ref('images').child(imageId).getDownloadURL()
    //                 .then(fireBaseUrl => {
    //                     console.log('first')
    //                     setRecommended(preValue => {
    //                         return { ...preValue, image: { url: fireBaseUrl, name: imageId } }
    //                     })
    //                     setImageAsFile('')
    //                 })
    //         })
    // }

    // const uploadRecommended = () => {
    //     console.log('upload processing')
    //     firebase.database().ref('/recommended/' + recId).set(recommended)
    //         .then(() => {
    //             setRecommended(initialRecommended)
    //             setRecId(uniqueId())
    //             console.log('we did it')
    //             alert('הנכס עלה בהצלחה')
    //         })
    //         .catch(err => console.log(err))
    // }

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
        <div style={{ textAlign: 'center' }}>
            <Header />
            <HandleRec upload={true} rec={rec} />
            {/* <Header />

            <h1 style={{ marginTop: '2rem' }}>העלאת מכתב המלצה</h1>
            <div style={{ position: 'block', textAlign: 'center', display: 'flex', flexDirection: 'column', padding: '5% 10%' }}>
                <TextField variant='outlined' label='שם' name='name' value={recommended.name} onChange={handleChange} />
                <br />
                <textarea cols='40' rows='5' placeholder='תוכן' name='content' value={recommended.content} onChange={handleChange} />
                <br />
                <input type='file' onChange={handlePictureChange} />
                <br />
                <button onClick={uploadImage}>העלה תמונה</button>
            </div>
            {recommended.image !== {} &&
                <div style={{ height: '20rem', textAlign: 'center', margin: '0 10%' }}>
                    <img height='100%' width='auto' src={recommended.image.url} alt="image tag" />
                    <IconButton onClick={() => deletePicture(recommended.image)}><HighlightOffIcon /></IconButton>
                </div>
            }

            <button onClick={uploadRecommended}>העלה את ההמלצה</button> */}

        </div>

    )
}

export default UploadRecommended;