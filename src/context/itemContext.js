import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from '../firebase/index';

const ItemsContext = createContext([])

export function useItems() {
    return useContext(ItemsContext)
}

export const ItemProvider = ({ children }) => {

    const [items, setItems] = useState({
        apartment: [],
        recommended: [],
        generalMessages: [],
        nameMessages: []
    })

    useEffect(() => {
        loadExample();
        loadItems();
        loadRecommended();
        loadGeneralMessages();
        loadNameMessages();
    }, [])

    const loadExample = () => {
        let loadRef = firebase.database().ref()
        loadRef.orderByChild('posted').once('value').then(snapshot => {
            let data = snapshot.val();
            console.log(data)
        })
    }
    const loadItems = () => {
        let loadRef = firebase.database().ref('items');
        loadRef.orderByChild('posted').once('value').then(snapshot => {
            const exist = (snapshot.val() !== null);
            if (exist) {
                let data = snapshot.val();
                console.log(data)
                let allItems = [];
                for (var item in data) {
                    allItems.push(data[item])
                }
                setItems(preValue => {
                    return {
                        ...preValue, apartment: allItems
                    }
                })
            }
            console.log(items)
        })
    }

    const loadRecommended = () => {
        let loadRefRec = firebase.database().ref('recommended');
        loadRefRec.orderByChild('posted').once('value').then(snapshot => {
            const exists = (snapshot.val() !== null);
            if (exists) {
                let data = snapshot.val();
                console.log(data)
                let allItems = [];
                for (var item in data) {
                    allItems.push(data[item])
                }
                setItems(preValue => {
                    return {
                        ...preValue, recommended: allItems
                    }
                })
            }
        })
    }
    const loadGeneralMessages = () => {
        let loadRef = firebase.database().ref('messages/generalMessages');
        loadRef.orderByChild('posted').once('value').then(snapshot => {
            const exist = (snapshot.val() !== null);
            if (exist) {
                let data = snapshot.val();
                console.log(data)
                let allItems = [];
                for (var item in data) {
                    allItems.push(data[item])
                }
                setItems(preValue => {
                    return {
                        ...preValue, generalMessages: allItems
                    }
                })
            }
            console.log(items)
        })
    }
    const loadNameMessages = () => {
        let loadRef = firebase.database().ref('messages/messageByName');
        loadRef.orderByChild('posted').once('value').then(snapshot => {
            const exist = (snapshot.val() !== null);
            if (exist) {
                let data = snapshot.val();
                console.log(data)
                let allItems = [];
                for (var item in data) {
                    allItems.push(data[item])
                }
                setItems(preValue => {
                    return {
                        ...preValue, nameMessages: allItems
                    }
                })
            }
            console.log(items)
        })
    }

    return (
        <ItemsContext.Provider value={items}>
            {children}
        </ItemsContext.Provider>
    )
}