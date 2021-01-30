import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Grid, Card } from '@material-ui/core';
import Header from './com/headerAdmin';


const OurArticles = () => {

    const history = useHistory();

    useFirebaseConnect([
        'ourArticles'
    ])

    const ourArticles = useSelector(state => state.firebase.ordered.ourArticles)

    const handleUpload = () => {
        history.push('/login/uploadOurArticle')
    }
    const handleEdit = (ourArticle) => {
        const id = ourArticle.key
        history.push('/login/editOurArticle/' + id)
    }

    if (!isLoaded(ourArticles)) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h3>כתבות עלינו</h3>
                <br />


                <button style={{ marginTop: '1rem' }} onClick={handleUpload}>העלה כתבה</button>

                <hr />
                {isEmpty(ourArticles) ?
                    <div>
                        אין כרגע כתבות
                    </div>
                    :
                    <Grid container spacing={2} style={{ margin: '0', width: '100%' }}>
                        {ourArticles.map(ourArticle => {
                            if (ourArticle.value) {
                                return <Grid key={ourArticle.key} item xs={12} sm={6} md={6} lg={6} xl={6} style={{ padding: '2rem' }}>
                                    <img src={ourArticle.value.img.url} style={{ height: '64px', width: '64px' }} />
                                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1rem' }}>
                                        {ourArticle.value.htmlURL}
                                    </span>
                                    <br />
                                    <button onClick={() => handleEdit(ourArticle)}>ערוך</button>
                                </Grid>
                            } else {
                                console.log(ourArticles)
                            }
                        })}

                    </Grid>
                }
            </div>
        </div>

    )
}
export default OurArticles;