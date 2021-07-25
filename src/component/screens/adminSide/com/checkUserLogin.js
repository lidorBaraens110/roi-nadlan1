import firebase from '../../../../firebase';
import { useHistory } from 'react-router-dom';

function CheckUserLogin() {
    var user = firebase.auth().currentUser;
    if (!user) {
        console.log(user)
        return false
    } else {
        console.log(user)
        return true
    }
}

export default CheckUserLogin;

