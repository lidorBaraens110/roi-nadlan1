import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Grid, Card } from '@material-ui/core';
import Header from './com/headerAdmin';


const Features = () => {

    const history = useHistory();

    useFirebaseConnect([
        'features'
    ])

    const features = useSelector(state => state.firebase.ordered.features)

    const handleUpload = () => {
        history.push('/login/uploadFeature')
    }
    const handleEdit = (feat) => {
        const id = feat.key
        history.push('/login/editFeature/' + id)
    }

    if (!isLoaded(features)) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h3>תכונות</h3>
                <span>מופיעה בדף הבית מתחת לדירות</span>
                <br />

                {isEmpty(features) || features.length <= 2 &&
                    <button style={{ marginTop: '1rem' }} onClick={handleUpload}>העלה תכונה</button>
                }
                <hr />
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