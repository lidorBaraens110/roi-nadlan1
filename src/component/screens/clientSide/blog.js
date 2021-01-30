import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../../header';
import { useItems } from '../../../context/itemContext';
import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../../footer';

const Blog = () => {
    const history = useHistory();
    const location = useLocation();
    const [articles, setArticles] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    const handleClick = (id) => {
        history.push(`/blog/${id}`)
    }
    return (
        <div>
            <Header />
            <Grid container className='grid-blog' style={{ padding: '5rem' }}>
                {articles.map((article, i) => {
                    <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4} onClick={() => handleClick(article.id)}>
                        <img className='blog-image' src={article.image.url} />
                        <span className='blog-title'>{article.title}</span>
                        <span className='blog-sub-title'>{article.desperation}</span>
                    </Grid>
                })}

            </Grid>
            <Footer />

        </div>
    )
}

export default Blog