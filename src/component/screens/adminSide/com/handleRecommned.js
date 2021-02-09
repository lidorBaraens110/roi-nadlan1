import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, Icon, TextField } from '@material-ui/core';
import Header from './headerAdmin';
import firebase, { storage } from '../../../../firebase';
import { useFirebase } from 'react-redux-firebase';
import { uniqueId } from './functions';

const initialRecommended = ({
    name: '',
    content: '',
    img: { url: '', fullPath: '' }
})

const HandleRecommended = ({ upload, rec, id }) => {

    const history = useHistory();
    const theFirebase = useFirebase();

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
        let lastPhotoPath = recommended.img.fullPath;
        const image = e.target.files[0]
        const imageId = uniqueId()
        console.log(image)
        theFirebase.uploadFile('images', image, 'recommendedImage', {
            documentId: (res, x, y, url) => {
                setRecommended((preVal) => {
                    return { ...preVal, img: { url: url, fullPath: res.ref.fullPath } }
                })
            }, name: imageId
        }).then(() => {
            console.log('gj')
            setRecommended(preVal => { return { ...preVal } })
        }).then(() => {
            if (!upload) {
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).catch(err => console.log(err))
            .catch(err => {
                console.log(err)
            })

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
                {recommended.img &&
                    <div style={{ height: '20rem', textAlign: 'center', margin: '1rem 10%' }}>
                        <img height='100%' width='auto' src={recommended.img.url} alt="image tag" />
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