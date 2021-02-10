import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
// import items from './allClothe';
// import userDetail from './userDetailsReducer';
// import item from './itemReducer'
export default combineReducers({
    firebase: firebaseReducer
});