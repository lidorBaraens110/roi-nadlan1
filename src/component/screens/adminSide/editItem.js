import React, { useState, useEffect } from 'react';
import firebase, { storage } from '../../../firebase';
// import { Icon, IconButton, List, ListItem } from '@material-ui/core';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HandleItem from './com/handleItem';
import HeaderLogin from '../../../component/headerLogin';
import { useHistory, useLocation } from 'react-router-dom';


const EditItem = () => {
    const history = useHistory();
    const location = useLocation();
    const [flag, setFlag] = useState(false);
    const [item, setItem] = useState({});
    useEffect(() => {
        console.log('hellp')
        console.log(location.state)
        setItem(location.state)
        if (item) {
            setFlag(true)
        }
    }, [location])

    // const [imageAsFile, setImageAsFile] = useState('')

    // const handleChange = (e) => {
    //     const image = e.target.files[0]
    //     setImageAsFile(image)
    // }

    // const handleUpload = () => {
    //     const uriParts = imageAsFile.split(".");
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
    //                     setItem(preValue => {
    //                         return { ...preValue, images: [...item.images, { url: fireBaseUrl, name: imageId }] }
    //                     })
    //                 })
    //         })
    // }

    // const handleItemChange = (e) => {
    //     const target = e.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     setItem(preValue => {
    //         return {
    //             ...preValue, [name]: value
    //         }
    //     });
    // }

    // const deletePicture = (image, i) => {
    //     var dataRef = firebase.database().ref('/items/' + item.itemId + '/images/' + i);
    //     dataRef.remove();
    //     console.log(image)
    //     const storageRef = storage.ref()
    //     var imageRef = storageRef.child(`images/${image.name}`);
    //     // Delete the file
    //     imageRef.delete().then(function () {
    //         setItem(preValue => {
    //             return {
    //                 ...preValue, images: item.images.filter((image, index) => {
    //                     return index !== i
    //                 })
    //             }
    //         })
    //         // File deleted successfully
    //     }).catch(function (error) {
    //         // Uh-oh, an error occurred!
    //     });

    // }
    // const uploadTheItem = () => {
    //     console.log('upload processing')
    //     firebase.database().ref('/items/' + item.itemId).set(item)
    //         .then(() => {
    //             console.log('we did it')
    //             setTimeout(() => {
    //                 history.push('/login/home');
    //             }, 2000)
    //             alert('הנכס עודכן בהצלחה')
    //         })
    //         .catch(err => console.log(err))
    //     alert('itemUpload');

    // }
    // const test = () => {
    //     console.log(item)
    // }

    return (
        <div>
            <HeaderLogin />
            <div style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', padding: '0 10%', marginBottom: '3rem', textAlign: 'center' }} >
                <br />
                <div >
                    <h1>עדכון נכס</h1>
                    <br />
                    {flag ? <HandleItem TheItemm={item} upload={false} UpButtonSpan={'עדכן נכס'} popUpSuccessSpan={'הכנס עודכן בהצלחה'} />
                        : <span>...loading</span>
                    }
                    {/*
                     <List style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        {Object.keys(item).map((key, i) => {
                            if (key === 'images') {
                                return
                            } else {
                                if (item[key] === false || item[key] === true) {
                                    console.log(item[key])
                                    return <div>
                                        <text>{key}</text>
                                        <input type='checkbox' checked={item[key]} style={{ fontSize: '20px', margin: '1rem', padding: '0 5rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
                                    </div>
                                }
                                if (key === 'freeContext') {
                                    return
                                }
                                if (typeof (key) === 'string') {
                                    console.log('string')
                                    return <input placeholder={key} style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
                                }
                            }


                        })}

                    </List>
                </div>

                <textarea placeholder='טקסט חופשי' style={{ fontSize: '20px', margin: '1rem' }} name='טקסט חופשי' value={item.freeContext} onChange={handleItemChange} cols="40" rows="5" />
                <div> <input type='file' onChange={handleChange} />
                    <button onClick={handleUpload}>uploadImage</button>
                </div>

                {item.images !== [] && <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {item.images.map((image, i) => {

                        return <div key={i} style={{ display: 'flex', width: '100', flexDirection: 'column', margin: '1rem', justifyContent: 'space-evenly' }}>
                            <img height='200px' width='100' src={image.url} alt="image tag" />
                            <IconButton onClick={() => deletePicture(image)}><Icon><HighlightOffIcon /></Icon></IconButton>
                        </div>
                    })}
                </div>
                }
                <button onClick={() => test()}>לחץ לפרטים</button>
                <button style={{ fontSize: '16' }} onClick={uploadTheItem}>עדכן את הפריט</button> */}
                </div>
            </div>
        </div >
    )
}


export default EditItem;