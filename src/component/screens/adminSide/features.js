import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebaseConnect, isEmpty, isLoaded, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Grid, Card, TextField } from '@material-ui/core';
import Header from './com/headerAdmin';
import firebase from '../../../firebase';


const Features = () => {

    const theFirebase = useFirebase();
    const history = useHistory();

    useFirebaseConnect([
        'features/features',
        'features/title'
    ])

    const features = useSelector(state => state.firebase.ordered.features && state.firebase.ordered.features['features'])
    const title = useSelector(state => state.firebase.data.features && state.firebase.data.features['title'])

    const [theTitle, setTheTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const changeTitle = (e) => {
        console.log(e.target.value)
        setTheTitle(e.target.value)
    }
    const handleUpload = () => {
        history.push('/login/uploadFeature')
    }

    useEffect(() => {
        if (isLoaded(title) && !isEmpty(title)) {
            setTheTitle(title)
        }
    }, [title])
    const handleDelete = (feature) => {
        firebase.database().ref(`/features/${feature.key}`).remove().then(() => {
            theFirebase.deleteFile(`${feature.value.icon.fullPath}`).then(() => {
                console.log('remove image')
            }).then(() => window.location.reload(false)).catch(err => console.log(err))
        }).catch((err) => console.log('data base', err))
    }
    const handleEdit = (feat) => {
        const id = feat.key
        history.push('/login/editFeature/' + id)
    }
    const handleUploadTitle = () => {
        // console.log(theTitle)
        theFirebase.database().ref('/features/title').set(theTitle)
            .then(() => {
                console.log('update')
                setEdit(false)
            })
            .catch(err => console.log(err))
    }
    if (!isLoaded(features)) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '1rem' }}>תכונות</h3>
                <span>מופיעה בדף הבית מתחת לדירות</span>
                <br />

                {(isEmpty(features) || features.length <= 2) &&
                    <button style={{ marginTop: '1rem' }} onClick={handleUpload}>העלה תכונה</button>
                }
                <hr />
                <TextField disabled={edit ? false : true} label='כותרת של התכונות' name='title' value={theTitle} onChange={changeTitle} variant='outlined' />
                <br />
                {edit ? <button onClick={handleUploadTitle}>עדכן כותרת</button>
                    : <button onClick={() => setEdit(true)}>ערוך</button>}
                <br />
                {isEmpty(features) ?
                    <div>
                        אין כרגע תכונות
                    </div>
                    :
                    <Grid container spacing={2} style={{ margin: '0', width: '100%' }}>
                        {features.map(feature => {
                            if (feature.value) {
                                return <Grid key={feature.key} item xs={12} sm={6} md={4} lg={4} xl={4} style={{ padding: '2rem' }}>
                                    <img src={feature.value.icon.url} style={{ height: '64px', width: '64px' }} />
                                    <h4 style={{ padding: '0.5rem 0' }}>{feature.value.title}</h4>
                                    <span style={{ paddingTop: '1rem', lineHeight: 1.5, fontSize: '1rem' }}>
                                        {feature.value.des}
                                    </span>
                                    <br />
                                    <button onClick={() => handleEdit(feature)}>ערוך</button>
                                    <button onClick={() => handleDelete(feature)}>מחק</button>
                                    <button onClick={() => console.log(feature)}> בדוק</button>
                                </Grid>
                            } else {
                                console.log(feature)
                            }
                        })}

                    </Grid>
                }
            </div>
        </div>

    )
}
export default Features;