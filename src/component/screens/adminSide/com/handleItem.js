import React, { useState, useEffect, useRef } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import firebase, { storage } from '../../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, List, DialogActions, TextField, Input, Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';

// import UploadImage from '../com/uploadImage';


const filesPath = 'images';
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
    enterDate: '',
    price: '',
    parking: false,
    balcony: false,
    elevator: false,
    sell: false,
    freeContext: '',
    favorite: '',
    favorites: [],
    lat: '',
    lon: '',
    images: []
}
const HandleItem = ({ popUpSuccessSpan, UpButtonSpan, upload, TheItemm, type }) => {

    const [imageToDelete, setImageToDelete] = useState([]);
    const theFirebase = useFirebase();
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
    const [dragging, setDragging] = useState(false);
    const [dragIndex, setDragIndex] = useState();
    const dragItem = useRef()
    const dragNode = useRef()


    const handleDrop = (files) => {
        console.log('proccess')
        theFirebase.uploadFiles('images', files, 'images', {
            documentId: (res, x, y, url) => {
                console.log(Math.round((res.bytesTransferred / res.totalBytes) * 100))
                const percentUploaded = Math.round((res.bytesTransferred / res.totalBytes) * 100)
                setImgPercent(percentUploaded);
                //get the full path
                console.log('res', res.ref.fullPath)
                //get download url
                item.images.push({ fullPath: res.ref.fullPath, url: url })
                console.log(url)
            }
        },
        ).then(res => {
            setItem(preVal => {
                console.log(item.images)
                return { ...preVal, images: [...item.images] }
            })
            console.log(res)
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
        console.log(upload)
        console.log(image)
        if (upload) {
            theFirebase.deleteFile(image.fullPath).then(() => {
                setItem(preValue => {
                    return {
                        ...preValue, images: item.images.filter(img => {
                            return image.fullPath !== img.fullPath
                        })
                    }
                })
            }).catch(err => console.log(err))
        } else {
            setItem(preValue => {
                return {
                    ...preValue, images: item.images.filter(img => {
                        return image.fullPath !== img.fullPath
                    })
                }
            })
            setImageToDelete(preVal => [...preVal, image])
        }

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

            firebase.database().ref(`/apartments/${type}/${item.itemId}`).set(item)
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
            imageToDelete.map(image => {
                theFirebase.deleteFile(image.fullPath).then(() => {
                    console.log('image remove')
                })
            })
            firebase.database().ref(`/apartments/${type}/${item.itemId}`).set(item)
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
            return { ...preValue, favorites: [...item.favorites, item.favorite], favorite: '' }
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
    const handleDragStart = (e, { image, i }) => {
        setDragIndex(i)
        console.log('dragItem...', image)
        console.log('dragNode...', e.target)
        dragItem.current = i
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setDragging(true)
    }
    const handleDragEnd = () => {
        setDragIndex()
        console.log('ending drag...')
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleDragEnter = (e, { image, i }) => {
        // console.log('enterDrag..', image)
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log('current item...', currentItem)
            // let x = item.images.indexOf(currentItem);
            console.log('image', image)
            // console.log(x)
            console.log('this is not the same item')
            console.log('old', item.images)
            let newImages = item.images;
            newImages.splice(i, 0, newImages.splice(currentItem, 1)[0])
            console.log('new', newImages)
            setItem(preVal => {
                dragItem.current = i
                return { ...preVal, images: [...newImages] }
            })
            // setItem(preVal)
        }
    }

    return (
        <div>
            <div dir='rtl' noValidate style={{
                textAlign: 'right',
                display: 'table',
                width: '100%', /*Optional*/
                tableLayout: 'fixed', /*Optional*/
                borderSpacing: '10px' /*Optional*/
            }}>
                <div>
                    <TextField dir='rtl' id="standard-basic" label={'שם'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.name} name='name' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'עיר'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.city} name='city' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'רחוב'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.address} name='address' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'גודל'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.size} name='size' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'חדרים'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.rooms} name='rooms' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'קומה'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.floor} name='floor' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'תאריך כניסה'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.enterDate} name='enterDate' onChange={handleItemChange} />
                    <TextField dir='rtl' id="standard-basic" label={'מחיר'} variant='outlined'
                        style={{ fontSize: '20px', display: 'inline-block', direction: 'rtl' }} value={item.price} name='price' onChange={handleItemChange} />

                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%' }}>
                        <div>
                            <span>מרפסת</span>
                            <br />
                            <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} value={item.balcony} name='balcony' onChange={handleItemChange} checked={item.balcony} />
                        </div>
                        <div>
                            <span>חניה</span>
                            <br />
                            <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} value={item.parking} name='parking' onChange={handleItemChange} checked={item.parking} />
                        </div>

                        <div>
                            <span>מעלית</span>
                            <br />
                            <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} value={item.elevator} name='elevator' onChange={handleItemChange} checked={item.elevator} />
                        </div>
                        <div style={{ textAlign: 'center', border: '1px dashed red', padding: '0 1rem' }}>
                            <span>סימון וי אומר שהנכס נמכר/הושכר</span>
                            <br />
                            <span>נמכר?</span>

                            <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} value={item.sell} name='sell' onChange={handleItemChange} checked={item.sell} />
                        </div>
                    </div>
                    <span>תיאור הנכס</span>
                    <br />
                    <textarea placeholder='טקסט חופשי' onKeyPress={handleItemChange}
                        style={{ fontSize: '20px' }} name='freeContext' value={item.freeContext} onChange={handleItemChange} cols="100" rows="8" />

                    <div>
                        <span>מקומות מרכזיים</span>
                        <br />
                        <button onClick={addToFavorites}>+</button><input placeholder='מקומות מרכזיים' style={{ fontSize: '20px', margin: '1rem' }} value={item.favorite} name='favorite' onChange={handleItemChange} />
                        <br />
                        {item.favorites.map((fav, i) => {
                            return <div key={i}> <button onClick={() => removeFromFavorites(i)}>-</button><span key={i}>{fav}</span>
                                <br />
                            </div>
                        })}
                    </div>
                </div>

            </div>

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


            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div style={{ height: '5rem', border: '1px black solid' }}>
                                <p>גרור לכאן או לחץ כאן על מנת להוסיף תמונות לנכס</p>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            {
                item.images && <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid container spacing={5}>
                        {item.images.map((image, i) => {
                            return <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div key={i}
                                >
                                    {<span>{i === 0 ? 'תמונה ראשית' : i}</span>}
                                    <img draggable onDragEnter={dragging ? e => { handleDragEnter(e, { image, i }) } : null}
                                        onDragStart={e => { handleDragStart(e, { image, i }) }} height='auto' width='100%' style={{ opacity: i == dragIndex && '0.5' }} src={image.url} alt="image tag" />
                                    <IconButton onClick={() => deletePicture(image)}><HighlightOffIcon /></IconButton>
                                </div>
                            </Grid>
                        })}
                    </Grid>
                </div>
            }
            <button onClick={() => test()}>לחץ לפרטים</button>
            <button style={{ fontSize: '16' }} onClick={upload ? uploadTheItem : editTheItem}>{UpButtonSpan}</button>
            {/* <UploadImage /> */}

        </div >
    )
}


export default HandleItem;

// {Object.keys(item).map((key, i) => {

//     if (key === 'images') {
//         return <div key={i}>
//             <span>{imgPercent}%</span>
//         </div>
//     } else {
//         if (item[key] === false || item[key] === true) {
//             return <div key={i} >

//                 <input type='checkbox' style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
//                 <span>{key}</span>
//             </div>
//         }
//         if (key == 'favorite') {
//             return <div key={i}>
//                 <span>מקומות מרכזיים</span>
//                 <br />
//                 <button onClick={addToFavorites}>+</button><input placeholder={key} style={{ fontSize: '20px', margin: '1rem' }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
//                 <br />
//                 {item.favorites.map((fav, i) => {
//                     return <div key={i}> <button onClick={() => removeFromFavorites(i)}>-</button><span key={i}>{fav}</span>
//                         <br />
//                     </div>
//                 })}
//             </div>
//         }
//         if (key === 'freeContext') {

//             return <textarea key={i} placeholder='טקסט חופשי' onKeyPress={handleItemChange}
//                 style={{ fontSize: '20px', margin: '1rem' }} name={key} key={i} value={item[key]} onChange={handleItemChange} cols="40" rows="5" />
//         }
//         if (typeof (key) === 'string' && key !== 'itemId' && key !== 'favorites') {
//             return <TextField dir='rtl' id="standard-basic" label={key} variant='outlined'
//                 style={{
//                     fontSize: '20px', display: 'inline-block', direction: 'rtl'
//                     /*Optional*/
//                 }} key={i} value={item[key]} name={key} onChange={handleItemChange} />
//         }
//     }
// })
// }