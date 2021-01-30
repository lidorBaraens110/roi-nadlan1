import { getByPlaceholderText } from '@testing-library/react';
import firebase from '../../firebase';
const getAllData = () => {
    let loadRef = firebase.database().ref()
    loadRef.orderByChild('posted').once('value').then(snapshot => {
        return snapshot.val()
    })
}

export const initial = () => {

    let data = getAllData();
    console.log(data)
    return {
        type: 'INITIAL',
        payload: data
    }
}