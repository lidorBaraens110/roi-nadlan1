import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../header';

import Footer from '../../footer';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const Article = ({ }) => {

    const [isWidth, setIsWidth] = useState(false);
    const { id } = useParams();

    useFirebaseConnect([
        `articles/${id}`
    ])

    const article = useSelector(state => state.firebase.data.articles && state.firebase.data.articles[id])
    useEffect(() => {
        console.log(new Date())
        var img = new Image()
        if (isLoaded(article)) {
            img.onload = function () {
                if (this.width < this.height) {
                    setIsWidth(false)
                } else {
                    setIsWidth(true)
                }
            };
            img.src = article.mainImg.url;
            console.log(article.mainImg.url)

        }
    }, [article])
    function createMarkup() {
        return { __html: article.content };
    }


    return (
        <div>
            <Header stat={true} backgroundColor={true} />
            {!isLoaded(article) && isEmpty(article) ? <CircularProgress /> :
                <div className='article-div'>
                    <h2> {article.title}</h2>
                    <div className='article-details'>
                        <span> <strong>נכתב על ידי </strong>{article.createUser}</span>
                        <span><strong> עודכן לאחרונה </strong>{article.createDate}</span>


                    </div>

                    <img className={isWidth ? 'article-image-width' : 'article-image-height'} src={article.mainImg.url} />

                    <div className='article-content' dangerouslySetInnerHTML={createMarkup()} />
                </div>
            }
            <Footer />
        </div>
    )
}
export default Article;