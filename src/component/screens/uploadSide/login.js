import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })

    const history = useHistory();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(preValue => {
            return { ...preValue, [name]: value }
        });
    }
    useEffect(() => {
        console.log('sadasd:' + JSON.stringify(process.env))
    }, [])

    const handleLogin = () => {

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                console.log('signIn')
                history.push('/login/home')
            })
            .catch((error) => {
                alert('שם משתמש או סיסמא לא נכונים')
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', padding: '10% 40%' }}>
            <h1>רועי נדלן</h1>
            <input style={{ padding: '1rem', margin: '1rem' }} placeholder='שם משתמש' class="form-control top" name='email' onChange={handleChange} />


            <input style={{ padding: '1rem', margin: '1rem' }} placeholder="סיסמא" type="password" class="form-control bottom" name='password' onChange={handleChange} />

            <Button style={{ padding: '1rem', margin: '1rem' }} onClick={handleLogin} class="btn btn-lg btn-primary btn-block"><text>היכנס</text></Button>


        </div>
    )
}

export default Login;