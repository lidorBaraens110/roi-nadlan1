import React, { useState } from 'react';
import Header from './com/headerAdmin';
import HandleOurArticle from './com/handleOurArticle';



function UploadOurArticles() {

    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const uniqueId = () => {
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }
    const [ourArticle, setOurArticle] = useState({
        img: { url: '', path: '' },
        htmlURL: '',
        id: uniqueId()
    })

    return (
        <>
            <Header />
            <HandleOurArticle upload={false} myArticle={ourArticle} />
        </>
    );
}

export default UploadOurArticles; 