import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from '../firebase/index';

const ApartmentContext = createContext([])

export function useApartment() {
    return useContext(ApartmentContext)
}

export const ApartmentProvider = ({ children }) => {

    const [apartment, setApartment] = useState([])
    useEffect(() => {
        console.log('sajfb')
        loadItems();
        console.log(apartment)
    }, [])

    const loadItems = () => {
        let loadRef = firebase.database().ref('items');
        loadRef.orderByChild('posted').once('value').then(snapshot => {
            const exist = (snapshot.val() !== null);
            if (exist) {
                let data = snapshot.val();
                console.log(data)
                for (var item in data) {
                    console.log(data)
                    setApartment(preValue => [...preValue, data[item]])

                }

            }
        })
    }
    return (
        <ApartmentContext.Provider value={apartment}>
            {children}
        </ApartmentContext.Provider>
    )
}