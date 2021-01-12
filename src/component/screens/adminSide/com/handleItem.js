import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import firebase, { storage } from '../../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, IconButton, List, DialogActions, TextField, Input, Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
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
const HandleItem = ({ popUpSuccessSpan, UpButtonSpan, upload, TheItemm }) => {
    const classes = useStyles();

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }

    const [imgPercent, setImgPercent] = useState();
    const history = useHistory()
    const [pop, setPop] = useState(false)
    const [successPopUp, setSuccessPopUp] = useState(false)

    const [item, setItem] = useState(TheItemm)

    const [imageAsFile, setImageAsFile] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image)
    }

    const handleUploadImg = () => {
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
            updateTheImage()
            // File deleted successfully
        }).catch(function (error) {
            // Uh-oh, an error occurred!
        });
    }
    const updateTheImage = () => {
        firebase.database().ref('/items/' + item.itemId).set(item)
            .then(() => {
                console.log('updateImg in database')
            })
            .catch(err => console.log(err))
    }
    const checkErr = () => {
        let flag = true;
        Object.keys(item).map(key => {
            if (typeof (item[key]) !== "boolean") {
                if (key !== 'favorite') {
                    console.log(key)
                    if (key == 'lat' || key == 'lon') {
                        console.log('1')
                        console.log(item[key])
                        let isnum = item[key].match(/[^.0-9]+/g);

                        if (isnum) {

                            console.log('2')
                            flag = false;
                        }
                    }
                    if (item[key] === [] || item[key] == '') {
                        flag = false;
                        return
                    }
                }
            }
        })
        return flag
    }
    //upload page
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
    //edit page
    const editTheItem = () => {
        console.log('upload processing')
        if (checkErr()) {
            firebase.database().ref('/items/' + item.itemId).set(item)
                .then(() => {
                    setTimeout(() => {
                        setSuccessPopUp(false)
                        history.push('/login/home');
                    }, 3000)
                    setSuccessPopUp(true);
                    console.log('we did it')
                    alert('הנכס עודכן בהצלחה')
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
            <form style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                {Object.keys(item).map((key, i) => {

                    if (key === 'images') {
                        return <div key={i}> <input type='file' onChange={handleChange} />
                            <br />
                            {imageAsFile !== '' && <button onClick={handleUploadImg}>העלה תמונה</button>}
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

                                <TextField required dir='rtl' id="standard-basic" label={key} variant='outlined' style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />

                            </div>
                        }
                    }


                })}
            </form>
  );
            <Dialog
                style={{ textAlign: 'center' }}
                open={pop}
                onClose={() => setPop(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">ישנה בעיה</DialogTitle>
                <DialogContent>
                    <span>אחד או יותר מהפריטים לא מלא/לא נכון אנא מלא את כל הפריטים</span>
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
                    <span>{popUpSuccessSpan}</span>
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => setSuccessPopUp(false)} color="primary" autoFocus>
                        close
                              </Button>
                </DialogActions>
            </Dialog>



            {item.images !== [] && <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid container spacing={5}>
                    {item.images.map((image, i) => {

                        return <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            {<span>{i === 0 ? 'תמונה ראשית' : i}</span>}
                            <img height='auto' width='100%' src={image.url} alt="image tag" />
                            <IconButton onClick={() => deletePicture(image)}><HighlightOffIcon /></IconButton>
                        </Grid>
                    })}
                </Grid>
            </div>
            }
            <button onClick={() => test()}>לחץ לפרטים</button>
            <button style={{ fontSize: '16' }} onClick={upload ? uploadTheItem : editTheItem}>{UpButtonSpan}</button>

        </div >
    )
}


export default HandleItem;