import React from 'react'
import { Provider } from 'react-redux'
import firebase from './firebase';
import { createStore, combineReducers } from 'redux';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase'
import MoreExample from './moreExample';
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// const fbConfig = firebase

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
}

// Add firebase to reducers //
const rootReducer = combineReducers({
    firebase: firebaseReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
}
const check = () => {
    console.log(rrfProps.firebase)
}
// Setup react-redux so that connect HOC can be used
const Example = () => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MoreExample />
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}

export default Example;