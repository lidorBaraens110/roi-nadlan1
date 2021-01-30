import React, { useState } from 'react';
import Header from './com/headerAdmin';
import { TextField, TextareaAutosize } from '@material-ui/core';
import firebase, { storage } from '../../../firebase';
import HandleArticle from './com/handleArticles';


const ArticleUpload = () => {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [article, setArticle] = useState({
        id: uniqueId(),
        title: '',
        des: '',
        img: { url: '', path: '' }
    })


    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <HandleArticle upload={true} theArticle={article} />
        </div>
    )
}

export default ArticleUpload;