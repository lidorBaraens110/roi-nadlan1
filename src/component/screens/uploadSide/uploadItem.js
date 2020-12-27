import React, { useState, useEffect } from 'react';
import firebase, { storage } from '../../../firebase';
import { Icon, IconButton, List, ListItem } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HeaderLogin from '../../../component/headerLogin';

const initialItem = {
    name: '',
    address: '',
    city: '',
    size: '',
    floor: '',
    rooms: '',
    parking: false,
    balcony: false,
    elevator: false,
    enterDate: '',
    freeContext: '',
    price: '',
    lat: '',
    lon: '',
    images: []
}
const UploadImage = () => {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }

    const [item, setItem] = useState({
        itemId: uniqueId(),
        name: '',
        address: '',
        city: '',
        size: '',
        floor: '',
        rooms: '',
        parking: false,
        balcony: false,
        elevator: false,
        enterDate: '',
        freeContext: '',
        price: '',
        lat: '',
        lon: '',
        images: []
    })

    const [imageAsFile, setImageAsFile] = useState('')


    const handleChange = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image)
    }

    const handleUpload = () => {

        const uriParts = imageAsFile.name.split(".");
        const fileType = uriParts[uriParts.length - 1];
        console.log('start of upload')
        let imageId = uniqueId() + '.' + fileType;
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${imageId}`).put(imageAsFile)
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
                        setItem(preValue => {
                            return { ...preValue, images: [...item.images, { url: fireBaseUrl, name: imageId }] }
                        })
                        setImageAsFile('')
                    })
            })
    }

    const handleItemChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setItem(preValue => {
            return {
                ...preValue, [name]: value
            }
        });
    }

    const deletePicture = (image) => {
        console.log(image)
        const storageRef = storage.ref()
        var imageRef = storageRef.child(`images/${image.name}`);
        // Delete the file
        imageRef.delete().then(function () {
            // File deleted successfully
        }).catch(function (error) {
            // Uh-oh, an error occurred!
        });
    }
    const uploadTheItem = () => {
        console.log('upload processing')
        firebase.database().ref('/items/' + item.itemId).set(item)
            .then(() => {
                setItem(initialItem)
                setItem(preValue => {
                    return { ...preValue, itemId: uniqueId() }
                })
                console.log('we did it')
                alert('הנכס עלה בהצלחה')
            })
            .catch(err => console.log(err))
    }
    const test = () => {
        console.log(item)
    }

    return (
        <div>
            <HeaderLogin />
            <div style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', padding: '0 10%', marginBottom: '3rem', textAlign: 'center' }} >
                <br />
                <div >
                    <h1>העלאת נכס</h1>
                    <br />
                    <List style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        {Object.keys(item).map((key, i) => {
                            if (key === 'images') {
                                return <div> <input type='file' onChange={handleChange} />
                                    <br />
                                    {imageAsFile !== '' && <button onClick={handleUpload}>uploadImage</button>}
                                </div>
                            } else {
                                if (item[key] === false || item[key] === true) {
                                    console.log('hellpl')
                                    return <div>
                                        <text>{key}</text>
                                        <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
                                    </div>
                                }
                                if (key === 'freeContext') {
                                    return <textarea placeholder='טקסט חופשי' style={{ fontSize: '20px', margin: '1rem' }} name={key} key={i} value={item[key]} onChange={handleItemChange} cols="40" rows="5" />
                                }
                                if (typeof (key) === 'string') {
                                    console.log('string')
                                    return <input placeholder={key} style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
                                }
                            }


                        })}
                    </List>
                </div>


                {item.images !== [] && <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {item.images.map((image, i) => {

                        return <div key={i} style={{ display: 'flex', width: 'auto', height: '22rem', flexDirection: 'column', margin: '1rem', justifyContent: 'space-evenly' }}>
                            <img height='90%' width='auto' src={image.url} alt="image tag" />
                            <IconButton onClick={() => deletePicture(image)}><Icon><HighlightOffIcon /></Icon></IconButton>
                        </div>
                    })}
                </div>
                }
                <button onClick={() => test()}>לחץ לפרטים</button>
                <button style={{ fontSize: '16' }} onClick={uploadTheItem}>העלה את הפריט</button>
            </div>
        </div >
    )
}


export default UploadImage;