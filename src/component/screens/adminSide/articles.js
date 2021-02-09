import React, { useEffect } from 'react';
import Header from './com/headerAdmin';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';
import { Card, Grid } from '@material-ui/core';


const Articles = () => {

    const history = useHistory();
    const theFirebase = useFirebase();

    useFirebaseConnect([
        'articles'
    ])

    const articles = useSelector(state => state.firebase.ordered.articles);

    useEffect(() => {
        if (!isEmpty(articles)) {
            console.log(articles)
        }
    }, [articles])

    const handleUpload = () => {
        history.push('/login/uploadArticle')
    }
    const handleEdit = (artId) => {
        console.log('navigate edit ')
        console.log(artId)
        history.push(`/login/editArticle/${artId}`)
    }
    const handleDelete = (art) => {
        console.log('handleDelete')
        console.log(art)
        theFirebase.database().ref(`/articles/${art}`).remove()
            .then(() => {
                console.log('remove article')
            })
            .catch(err => console.log(err))
    }


    if (!isLoaded(articles)) {
        return <div>loading...</div>
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <h3 style={{ margin: '1rem' }}>המאמרים</h3>
            <button onClick={handleUpload}>העלה מאמר</button>
            <hr />
            {isEmpty(articles) ?
                <div>כרגע לא קיימים מאמרים</div>
                :
                <Grid container spacing={2} style={{ width: '100%', margin: '0', padding: '2rem' }}>
                    {console.log(articles), articles.map(article => {
                        if (article.value) {

                            return <Grid key={article.value.id} item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Card style={{ borderRadius: '0' }}>
                                    <img src={article.value.mainImg.url} style={{ height: 'auto', width: '100%' }} />
                                    <h5>{article.value.title}</h5>
                                    <span>{article.value.subTitle}</span>
                                </Card>
                                <br />
                                <button onClick={() => handleEdit(article.key)}>ערוך</button>
                                <button onClick={() => handleDelete(article.key)}>מחק</button>
                            </Grid>
                        }
                    })}
                </Grid>
            }
        </div>
    )
}

export default Articles