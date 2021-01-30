import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import Header from './com/headerAdmin';
import HandleArticle from './com/handleArticles';

const EditArticle = () => {

    const { id } = useParams();

    useFirebaseConnect([
        `articles/${id}`
    ])

    const article = useSelector(state => state.firebase.data.articles && state.firebase.data.articles[id])


    if (!isLoaded(article)) {
        return <div>loading</div>
    }

    if (isEmpty(article)) {
        console.log(article)
        return <div>wtfF?qsgaljgbd</div>
    }

    return (
        <div>
            <Header />
            <HandleArticle upload={false} theArticle={article} />
        </div>
    )
}

export default EditArticle;