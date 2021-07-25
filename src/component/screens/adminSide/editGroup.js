import React, { useEffect, useState } from 'react';
import HandleGroup from './com/handleGroup';
import { useLocation, useParams } from 'react-router-dom';
import Header from './com/headerAdmin';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const EditGroup = () => {


    const type = useLocation().state
    const { id } = useParams()

    useFirebaseConnect([
        `group/` + id,
        'collaboration/' + id,
        'manager'
    ])

    const group = useSelector(state => state.firebase.data.group && state.firebase.data.group[id])
    const manager = useSelector(state => state.firebase.data.manager)
    const collaboration = useSelector(state => state.firebase.data.collaboration && state.firebase.data.collaboration[id])



    if (!isLoaded(group) && !isLoaded(manager) && !isLoaded(collaboration)) {
        return <div>loading...</div>
    }
    if (isEmpty(group) && isEmpty(manager) && isEmpty(collaboration)) {
        return <div>אין חיה כזאת</div>
    }

    return (
        <div>
            <Header />
            <HandleGroup upload={false} thePerson={type == 'manager' ? manager : type == 'collaboration' ? collaboration : group} type={type} />

        </div>
    )
}

export default EditGroup;