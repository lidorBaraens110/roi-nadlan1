import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Header from './com/headerAdmin';
import HandleFeatures from './com/handleFeatures';

const EditFeature = () => {

    const { id } = useParams()
    useFirebaseConnect([
        `features/features${id}`
    ])

    const feature = useSelector(state => state.firebase.data.features && state.firebase.data.features['features'][id])


    if (!isLoaded(feature)) {
        return <div>loading...</div>
    }

    if (isEmpty(feature)) {
        return <div>ladjnflask</div>
    }


    return (
        <div>
            <Header />
            <HandleFeatures upload={false} theFeature={feature} />
        </div>
    )
}

export default EditFeature;