import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import Header from './com/headerAdmin';
import HandleOurArticle from './com/handleOurArticle';


const EditOurArticle = () => {

    const { id } = useParams();

    useFirebaseConnect([
        `ourArticles/${id}`
    ])

    const ourArticle = useSelector(state => state.firebase.data.ourArticles && state.firebase.data.ourArticles[id])


    if (!isLoaded(ourArticle)) {
        return <div>loading</div>
    }

    if (isEmpty(ourArticle)) {
        console.log(ourArticle)
        return <div>wtfF?qsgaljgbd</div>
    }

    return (
        <div>
            <Header />
            <HandleOurArticle upload={false} myArticle={ourArticle} />
        </div>
    )
}

export default EditOurArticle;