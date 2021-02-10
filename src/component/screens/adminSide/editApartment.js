import React, { useState } from 'react';
import HandleItem from './com/handleItem';
import HeaderLogin from './com/headerAdmin';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import DefaultPage from '../../defaultPage';


const EditApartment = () => {
    const { id } = useParams();
    const type = useLocation().state;
    useFirebaseConnect([
        `apartments/${type}/${id}`
    ])

    const apartment = useSelector(state => state.firebase.data.apartments && state.firebase.data.apartments[type][id])

    const history = useHistory();

    const [flag, setFlag] = useState(false);
    const [item, setItem] = useState({});

    if (!isLoaded(apartment)) {
        return <DefaultPage />
    }
    if (isEmpty(apartment)) {
        return <div>סעמקקק  type {type} id {id}</div>
    }

    return (
        <div>
            <HeaderLogin />
            <div style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', padding: '0 10%', marginBottom: '3rem', textAlign: 'center' }} >
                <br />
                <div >
                    <h1>עדכון נכס</h1>
                    <br />
                    <HandleItem TheItemm={apartment} type={type} upload={false} UpButtonSpan={'עדכן נכס'} popUpSuccessSpan={'הכנס עודכן בהצלחה'} />
                </div>
            </div>
        </div >
    )
}


export default EditApartment;