import React, { useState } from 'react';
// import Header from './com/headerAdmin';
import { TextField, TextareaAutosize } from '@material-ui/core';
import firebase, { storage } from '../../../../firebase';
import { useFirebase, } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uniqueId } from './functions';


const initial = {
    img: { url: '', fullPath: '' },
    htmlURL: ''
}

const HandleOurArticle = ({ upload, myArticle }) => {

    const theFirebase = useFirebase();
    const history = useHistory();


    // const s4 = () => {
    //     return Math.floor((1 + Math.random()) * 0x10000)
    //         .toString(16)
    //         .substring(1);
    // }

    // const uniqueId = () => {
    //     return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
    //         s4() + '-' + s4() + '-' + s4() + '-' + s4();
    // }
    const [ourArticle, setOurArticle] = useState(myArticle)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOurArticle(preVal => {
            return { ...preVal, [name]: value }
        })
    }

    const handleChangImage = (e) => {
        let lastPhotoPath = ourArticle.img.fullPath;
        const image = e.target.files[0]
        const imageId = uniqueId()
        console.log(image)
        theFirebase.uploadFile('images', image, 'ourArticleImage', {
            documentId: (res, x, y, url) => {
                setOurArticle((preVal) => {
                    return { ...preVal, img: { url: url, fullPath: res.ref.fullPath } }
                })
            }, name: imageId
        }).then(() => {
            console.log('gj')
            setOurArticle(preVal => { return { ...preVal } })
        }).then(() => {
            if (!upload) {
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).catch(err => console.log(err))
            .catch(err => {
                console.log(err)
            })

    }
    const handleUpload = () => {
        console.log('upload processing')
        firebase.database().ref('/ourArticles/' + ourArticle.id).set(ourArticle)
            .then(() => {
                setOurArticle(initial)
                setOurArticle(preValue => {
                    return { ...preValue, id: uniqueId() }
                })
                if (!upload) {

                    history.push('/login/ourArticles');
                }
                console.log('we did it')
                alert('המאמר עלה בהצלחה')
                // setSuccessPopUp(true);
            })
            .catch(err => console.log(err))
    }


    return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h3>{upload ? 'העלה מאמר' : 'ערוך מאמר'}</h3>
            <button onClick={() => console.log(firebase.auth().currentUser.uid)}> lsfjlfs</button>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '5% 10%' }}>
                <input type='file' onChange={handleChangImage} />
                {ourArticle.img && <img style={{ height: 'auto', width: '20rem' }} src={ourArticle.img.url} />}
                <br />
                <TextField dir='rtl' label='כתובת הכתבה' variant='outlined' required name='htmlURL' value={ourArticle.htmlURL} onChange={handleChange} />

                <br />
                <button onClick={handleUpload} >{upload ? 'העלה כתבה' : 'עדכן'}</button>
            </div>
            <button onClick={() => console.log(ourArticle)}>פרטים </button>
        </div>
    )
}

export default HandleOurArticle;