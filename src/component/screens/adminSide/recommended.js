import React from 'react';
import { useFirebaseConnect, isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import firebase, { storage } from '../../../firebase';
import Header from './com/headerAdmin';

const Recommended = () => {

    const theFirebase = useFirebase();
    const history = useHistory();

    useFirebaseConnect([
        'recommended'
    ])

    const recommended = useSelector(state => state.firebase.ordered.recommended);

    const handleUpload = () => {
        console.log('upload')
        history.push('/login/addRecommended')
    }

    const handleEdit = (id) => {
        console.log('edit', id)
        history.push('/login/editRecommended/' + id)
    }

    const handleDelete = (id) => {
        console.log('delete', id)
        firebase.database().ref(`/recommended/${id}`).remove().then(() => {
            theFirebase.deleteFile(`/image/${id}`).then(() => {
                console.log('remove image')
            }).catch((err) => console.log('image...', err))
        }).catch((err) => {
            console.log('data...', err)
        })
    }
    if (!isLoaded(recommended)) {
        console.log(recommended)
        return <div>loading...</div>
    }

    return (
        <>
            <Header />
            <div style={{ textAlign: 'center', padding: '0 5%' }}>
                <h3 style={{ margin: '1rem' }}>המלצות</h3>
                <button onClick={handleUpload}>הוסף המלצה</button>
                <hr />
                <div style={{ textAlign: 'right' }}>
                    {!isEmpty(recommended) ?
                        recommended.map(rec => {
                            console.log(rec.key)
                            let { img, name, content } = rec.value;
                            return <div key={rec.key}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    {img && <img src={img.url} style={{ height: 'auto', width: '10rem' }} />}
                                    <h5>{name}</h5>
                                    <span>{content}</span>
                                </div>
                                <br />
                                <button onClick={() => handleEdit(rec.key)}>ערוך</button>
                                <button onClick={() => handleDelete(rec.key)}>מחק</button>
                                <hr />
                            </div>
                        })
                        : <div>אין המלצות כרגע </div>}
                </div>
            </div>
        </>
    )
}
export default Recommended;
