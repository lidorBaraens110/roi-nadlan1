import { combineReducers } from 'redux';
import main from './mainReducer';
import { firebaseReducer } from 'react-redux-firebase';
// import items from './allClothe';
// import userDetail from './userDetailsReducer';
// import item from './itemReducer'
export default combineReducers({
    main,
    firebase: firebaseReducer
});