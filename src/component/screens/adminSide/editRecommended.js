import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import Header from './com/headerAdmin';
import HandleRec from './com/handleRecommned';


const EditRecommended = () => {

    const { id } = useParams();

    useFirebaseConnect([
        'recommended/' + id
    ])

    const recommended = useSelector(state => state.firebase.data.recommended && state.firebase.data.recommended[id])

    if (!isLoaded(recommended)) {
        return <div>loading...</div>
    }

    if (isEmpty(recommended)) {
        return <div>wtf</div>
    }

    return (
        <div>
            <Header />
            <HandleRec upload={false} rec={recommended} id={id} />

        </div>
    )
}

export default EditRecommended;