import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import firebase, { storage } from '../../../firebase';
import { Icon, IconButton, List, DialogActions, Button, ListItem, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import HeaderLogin from '../../../component/headerLogin';
import HandleItem from './com/handleItem';

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
    sell: false,
    enterDate: '',
    price: '',
    freeContext: '',
    favorite: '',
    favorites: [],
    lat: '',
    lon: '',
    images: []
}
const UploadImage = () => {
    const [imgPercent, setImgPercent] = useState();
    const [pop, setPop] = useState(false)
    const [successPopUp, setSuccessPopUp] = useState(false)
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
        sell: false,
        enterDate: '',
        price: '',
        freeContext: '',
        favorite: '',
        favorites: [],
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
                const percentUploaded = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100)
                setImgPercent(percentUploaded);
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
        console.log()
        if (e.nativeEvent.inputType === 'insertLineBreak') {
            console.log('enter')
        }
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
        setItem(preValue => {
            return {
                ...preValue, images: item.images.filter(img => {
                    return image.name !== img.name
                })
            }
        })
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
    const checkErr = () => {
        let flag = true;
        Object.keys(item).map(key => {
            if (typeof (item[key]) !== "boolean") {
                if (key != 'favorite') {
                    console.log(key)
                    if (item[key] === [] || item[key] == '') {
                        flag = false;
                        return
                    }
                }
            }
        })
        return flag
    }
    const uploadTheItem = () => {
        console.log('upload processing')
        if (checkErr()) {
            firebase.database().ref('/items/' + item.itemId).set(item)
                .then(() => {
                    setItem(initialItem)
                    setItem(preValue => {
                        return { ...preValue, itemId: uniqueId() }
                    })
                    console.log('we did it')
                    alert('הנכס עלה בהצלחה')
                    setSuccessPopUp(true);
                })
                .catch(err => console.log(err))

        } else {
            setPop(true)
        }
    }
    const addToFavorites = () => {
        console.log(item.favorite)

        setItem(preValue => {
            return { ...preValue, favorites: [...item.favorites, item.favorite] }
        })
    }
    const removeFromFavorites = (i) => {
        const newFav = item.favorites.filter((fav, index) => {
            return index !== i
        })
        console.log(newFav)
        setItem(preValue => {
            return { ...preValue, favorites: newFav }
        })
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
                    <HandleItem TheItemm={item} upload={true} UpButtonSpan={'העלה נכס'} popUpSuccessSpan={'הנכס עלה בהצחלה!!'} />
                </div>
                {/* <List style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        {Object.keys(item).map((key, i) => {

                            if (key === 'images') {
                                return <div key={i}> <input type='file' onChange={handleChange} />
                                    <br />
                                    {imageAsFile !== '' && <button onClick={handleUpload}>העלה תמונה</button>}
                                    <br />
                                    <span>{imgPercent}%</span>
                                </div>
                            } else {
                                if (item[key] === false || item[key] === true) {
                                    return <div key={i}>
                                        <text>{key}</text>
                                        <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />

                                    </div>
                                }
                                if (key == 'favorite') {
                                    return <div key={i}>
                                        <span>מקומות מרכזיים</span>
                                        <br />
                                        <button onClick={addToFavorites}>+</button><input placeholder={key} style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
                                        <br />
                                        {item.favorites.map((fav, i) => {
                                            return <div> <button onClick={() => removeFromFavorites(i)}>-</button><span key={i}>{fav}</span>
                                                <br />
                                            </div>
                                        })}
                                    </div>
                                }
                                if (key === 'freeContext') {

                                    return <div key={i}>
                                        <textarea placeholder='טקסט חופשי' onKeyPress={handleItemChange} style={{ fontSize: '20px', margin: '1rem' }} name={key} key={i} value={item[key]} onChange={handleItemChange} cols="40" rows="5" />

                                    </div>
                                }
                                if (typeof (key) === 'string' && key !== 'itemId' && key !== 'favorites') {
                                    return <div key={i} >
                                        <input placeholder={key} style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />

                                    </div>
                                }
                            }


                        })}
                    </List>
                    <Dialog
                        style={{ textAlign: 'center' }}
                        open={pop}
                        onClose={() => setPop(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">ישנה בעיה</DialogTitle>
                        <DialogContent>
                            <span>אחד או יותר מהפריטים לא מלא אנא מלא את כל הפריטים</span>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={() => setPop(false)} color="primary" autoFocus>
                                close
                              </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        style={{ textAlign: 'center' }}
                        open={successPopUp}
                        onClose={() => setSuccessPopUp(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">מעולה</DialogTitle>
                        <DialogContent>
                            <span>הנכס עלה בהצחלה!!</span>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={() => setSuccessPopUp(false)} color="primary" autoFocus>
                                close
                              </Button>
                        </DialogActions>
                    </Dialog>
                </div>


                {item.images !== [] && <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {item.images.map((image, i) => {

                        return <div key={i} style={{ display: 'flex', width: 'auto', height: '15rem', flexDirection: 'column', margin: '1rem', justifyContent: 'space-evenly' }}>
                            <img height='90%' width='auto' src={image.url} alt="image tag" />
                            <IconButton onClick={() => deletePicture(image)}><Icon><HighlightOffIcon /></Icon></IconButton>
                        </div>
                    })}
                </div>
                }
                <button onClick={() => test()}>לחץ לפרטים</button>
                <button style={{ fontSize: '16' }} onClick={uploadTheItem}>העלה את הפריט</button> */}
            </div>
        </div >
    )
}


export default UploadImage;