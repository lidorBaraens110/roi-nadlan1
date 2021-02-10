import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Header from '../../header';
import { Pagination } from '@material-ui/lab'

import { useHistory, useLocation } from 'react-router-dom';
import Footer from '../../footer';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import DefaultPage from '../../defaultPage';

const Blog = () => {

    useFirebaseConnect([
        'articles'
    ])

    const articles = useSelector(state => state.firebase.ordered.articles)
    const history = useHistory();
    const location = useLocation();

    const [articlesToShow, setArticlesToShow] = useState([])
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    const handleClick = (id) => {
        history.push(`/blog/${id}`)
    }
    useEffect(() => {
        let currentArticles = []

        if (isLoaded(articles) && !isEmpty(articles)) {
            currentArticles = articles.filter((article, i) => {
                return i < (page * 11)
            })
            setArticlesToShow(currentArticles)
            setCountPage(Math.ceil(articles.length / 10))
        }
    }, [articles])

    const handlePageChange = (event, value) => {
        setPage(value);
        setArticlesToShow(articles.filter((z, i) => {
            console.log(i)
            return ((value - 1) * 9) <= i && i < ((value * 9) + 1)
        }))
        window.scrollTo(0, 20)
    };
    if (!isLoaded(articles)) {
        return <DefaultPage />
    }
    return (
        <>
            <Header backgroundColor={true} stat={true} />
            <div className='blog-container' >
                <h3 className='header-blog' >ברוכים הבאים לבלוג של רועי רינט נדל״ן!</h3>

                {!isEmpty(articles) ? <>
                    <Grid container spacing={5} className='grid-blog' style={{ width: '100%', margin: 0 }}>
                        {articlesToShow.map((article, i) => {
                            if (article.value) {
                                console.log(article.value.subTitle.length)
                                return <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4} onClick={() => handleClick(article.key)}>
                                    <div style={{ borderRadius: '0' }}>
                                        <div style={{ backgroundColor: 'gray', height: '220px', position: 'relative' }}>
                                            {article.value.mainImg.url && <img className='blog-image' src={article.value.mainImg.url} />}
                                        </div>
                                        <hr style={{ margin: '0' }} />
                                        <div style={{ textAlign: 'right', padding: '1rem 0' }}>
                                            <h6 className='blog-title'>{article.value.title}</h6>
                                            <span className='blog-sub-title'> {article.value.subTitle.substring(0, 200)}</span>
                                            <br />
                                            <a style={{ fontSize: '0.7rem', color: 'orange' }}>{'קרא עוד>>'}</a>
                                        </div>

                                    </div>
                                </Grid>
                            }
                        })
                        }

                    </Grid>
                    <Pagination style={{ justifyContent: 'center', marginBottom: '1rem', display: 'flex' }}
                        count={countPage} page={page} onChange={handlePageChange} color="primary" />
                </>
                    : <div style={{ height: '70vh', textAlign: 'center', flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <h5> כרגע לא קיימים מאמרים בבלוג </h5>
                        <h6>בקרוב נכתוב לכם מאמרים חדשים</h6>
                        <img src='https://sites.google.com/a/th.tzafonet.org.il/hebrew1/_/rsrc/1472857242476/classroom-news/swgymmrym/books.jpg?height=307&width=320' />
                    </div>}
            </div>
            <Footer />
        </>
    )
}

export default Blog