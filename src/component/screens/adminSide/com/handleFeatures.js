
import React, { useState } from 'react';
import { List, ListItem, TextField } from '@material-ui/core';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { uniqueId } from './functions';


const initial = {
    title: '',
    des: '',
    icon: { url: '', fullPath: '' }
}
const HandleFeatures = ({ upload, theFeature }) => {

    const theFirebase = useFirebase();
    const history = useHistory();

    const [feature, setFeature] = useState(theFeature)


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        let lastPhotoPath = feature.icon.fullPath
        theFirebase.uploadFile('image', file, 'featureImage', {
            documentId: (res, x, y, url) => {
                setFeature(preVal => { return { ...preVal, icon: { url: url, path: res.ref.fullPath } } })
            }
        }).then(() => {
            console.log('image upload');
            setFeature(preVal => { return { ...preVal } })
        }).then(() => {
            if (!upload) {
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).catch(err => console.log(err))
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFeature(preVal => {
            return {
                ...preVal, [name]: value
            }
        })
    }

    const handleUpload = () => {
        theFirebase.database().ref(`features/features/${feature.id}`).set(feature)
            .then(() => {
                console.log('feature upload')
                setFeature(initial)
                setFeature(preVal => {
                    return { ...preVal, id: uniqueId() }
                })
                if (!upload) {
                    history.push('/login/features')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }} >
            <h3 >{!upload ? 'העלה תכונה' : 'ערוך תמונה'}</h3>
            <List style={{ padding: '3rem' }}>
                <ListItem>
                    <input type='file' onChange={handleImageChange} />
                </ListItem>
                {feature.icon.url &&
                    <img src={feature.icon.url} style={{ height: '10rem', width: 'auto' }}
                    />}
                <ListItem>
                    <TextField name='title' label='כותרת' variant='outlined' value={feature.title} onChange={handleChange} />
                </ListItem>
                <ListItem>
                    <textarea rows='5' cols='100' placeholder='תיאור' name='des' variant='outlined' value={feature.des} onChange={handleChange} />
                </ListItem>
            </List>
            <button onClick={handleUpload}>{upload ? 'עדכן' : 'העלה'}</button>
        </div>
    )
}
export default HandleFeatures