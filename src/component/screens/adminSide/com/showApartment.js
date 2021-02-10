import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Button, Typography } from '@material-ui/core';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import HeaderLogin from '../com/headerAdmin';
import DefaultPage from '../../../defaultPage';
import firebase from '../../../../firebase'
import Card from '../../../card';


const ShowApartment = ({ type }) => {

    useFirebaseConnect([
        `apartments/${type}`
    ])

    const apartments = useSelector(state => state.firebase.ordered.apartments && state.firebase.ordered.apartments[type])
    const history = useHistory()

    useEffect(() => {
        var user = firebase.auth().currentUser
        if (!user) {
            history.push('/login')
        } else {
            console.log(user)
        }
    }, [])

    const handleUpload = () => {

        history.push('/login/uploadApartment/' + type)

    }
    const editApartment = (apartment) => {
        console.log(apartment)
        history.push({ pathname: '/login/editApartment/' + apartment.itemId, state: type })
    }

    const handleDelete = (key) => {
        console.log('delete')
        firebase.database().ref(`/apartments/${type}/${key}`).remove()
            .then(() => window.location.reload(false)).catch(err => console.log(err))
    }

    if (!isLoaded(apartments)) {
        return <DefaultPage />
    }
    if (isEmpty(apartments)) {
        console.log('saldjfbasjlfbalsfnlaslfbasljfa......', isEmpty(apartments))
        return (
            <div style={{ textAlign: 'center' }}>
                <HeaderLogin />
                {type == 'forRent' && <h3 style={{ margin: '1rem' }}>נכסים להשכרה</h3>}
                {type == 'forSell' && <h3 style={{ margin: '1rem' }}>נכסים למכירה</h3>}
                <div style={{ height: '80vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ padding: '1rem', border: '1px solid black' }} onClick={handleUpload}>העלה נכס</Button>
                    <span>כרגע לא קיימות דירות</span>
                </div>
            </div>
        )
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <HeaderLogin />
            <Button style={{ margin: '1rem', padding: '1rem', border: '1px solid black' }} onClick={handleUpload}>העלה נכס</Button>
            <button onClick={() => console.log(apartments)}>בדוק את הנכסים</button>
            <Grid container >
                {apartments.map((apartment, i) => {
                    console.log(apartment.value);
                    return <Grid item
                        key={i}
                        xs={12} sm={12} md={6} lg={6} xl={6}
                    >
                        <Card item={apartment.value} onClick={editApartment} imgClass='login-home-images' />
                        <button onClick={() => handleDelete(apartment.key)}>מחק דירה</button>
                    </Grid>
                })}
            </Grid>
        </div >
    )
}

export default ShowApartment;