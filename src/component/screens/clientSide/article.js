import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../header';
import { useItems } from '../../../context/itemContext';
import Footer from '../../footer';

const Article = ({ }) => {


    const { id } = useParams();
    const [article, setArticle] = useState();
    const allArticle = useItems().articles;
    useEffect(() => {
        let x = allArticle.filter(article => article.id == id)
        setArticle(x[0])

    }, [useItems()])

    return (
        <div>
            <Header />
            <div className='article-div'>
                <img className='article-image' src={article.image.url} />
                <span className='article-title'>{article.title}</span>
                <span className='article-description'> {article.description}</span>
            </div>
            <Footer />
        </div>
    )
}
export default Article;