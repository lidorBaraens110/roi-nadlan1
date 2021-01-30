import React, { useState } from 'react';
// import Header from './com/headerAdmin';
import { TextField, TextareaAutosize } from '@material-ui/core';
import firebase, { storage } from '../../../../firebase';
import { useFirebase, } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const initial = {
    title: '',
    des: '',
    img: { url: '', path: '' }
}

const ArticleUpload = ({ upload, theArticle }) => {

    const theFirebase = useFirebase();
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
    const [article, setArticle] = useState(theArticle)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(preVal => {
            return { ...preVal, [name]: value }
        })
    }

    const handleChangImage = (e) => {
        const image = e.target.files[0]
        console.log(image)
        theFirebase.uploadFile('images', image, 'articlesImage', {
            documentId: (res, x, y, url) => {
                setArticle((preVal) => {
                    return { ...preVal, img: { url: url, path: res.ref.fullPath } }
                })
            }
        }).then(() => {
            console.log('gj')
            setArticle(preVal => { return { ...preVal } })
        }).catch(err => {
            console.log(err)
        })

    }
    const handleUpload = () => {
        console.log('upload processing')
        firebase.database().ref('/articles/' + article.id).set(article)
            .then(() => {
                setArticle(initial)
                setArticle(preValue => {
                    return { ...preValue, id: uniqueId() }
                })
                if (!upload) {
                    alert('lfasnasl')
                    history.push('/login/articles');
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
            <div style={{ display: 'flex', flexDirection: 'column', padding: '5% 10%' }}>
                <input type='file' onChange={handleChangImage} />
                {article.img && <img style={{ height: 'auto', width: '20rem' }} src={article.img.url} />}
                <br />
                <TextField dir='rtl' label='כותרת' variant='outlined' required name='title' value={article.title} onChange={handleChange} />
                <br />
                <TextareaAutosize required value={article.des} rows={8} placeholder='תיאור' name='des' onChange={handleChange} />
                <br />
                <button onClick={handleUpload} >{upload ? 'העלה מאמר' : 'עדכן'}</button>
            </div>
            <button onClick={() => console.log(article)}>פרטים </button>
        </div>
    )
}

export default ArticleUpload;