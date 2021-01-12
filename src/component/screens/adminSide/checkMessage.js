import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from '../../headerLogin';
import { useItems } from '../../../context/itemContext';
import firebase from '../../../firebase';

const CheckMessage = () => {

    const generalMessages = useItems().generalMessages;
    const nameMessages = useItems().nameMessages
    const [globalMessage, setGlobalMessage] = useState([])
    const [messageByName, setMessageByName] = useState([])

    useEffect(() => {
        setGlobalMessage(generalMessages);
        setMessageByName(nameMessages)
    }, [generalMessages, nameMessages])

    const updateDetails = () => {
        console.log('upload processing')
        firebase.database().ref('/messages/generalMessages').set(globalMessage)
            .then(() => {
                alert('עודכן')
            })
            .catch(err => console.log(err))
        firebase.database().ref('/messages/messagesByName').set(messageByName)
    }

    const handleCheckBox = (e) => {
        console.log(e.target.checked)
        console.log(e.target.name)
        let i = e.target.name
        const newGlobalMessage = globalMessage.map((message, x) => {
            if (x != i) {
                return message
            } else {
                Object.keys(message).map(key => {
                    if (key == 'check') {
                        message[key] = e.target.checked
                    }
                })
                return message
            }

        })
        setGlobalMessage(newGlobalMessage)
        setTimeout(() => {
            console.log(newGlobalMessage)
        }, 3000)

        // const gene
        // const target = e.target;
        // const value =  target.checked;
        // const name = target.name;
        // setItem(preValue => {
        //     return {
        //         ...preValue, [name]: value
        //     }
        // });

    }
    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1>בדיקת הודעות</h1>
                <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black', margin: '5%', padding: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ textDecoration: 'underLine' }}>לפי נכס</h3>
                        <TableContainer component={Paper} >
                            <Table aria-label="simple table" style={{ textAlign: 'right', alignItems: 'right' }} >
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="right" >נקרא</TableCell>
                                        <TableCell align="right">שם</TableCell>
                                        <TableCell align="right">טלפון</TableCell>
                                        <TableCell align="right">מייל</TableCell>
                                        <TableCell align="right">הודעה</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {globalMessage.map((message, i) => (
                                        <TableRow key={i} style={{ textDecoration: message.check && 'line-through' }}>
                                            <TableCell align="right" component="th" scope="row">
                                                <input type='checkBox' name={i} checked={message.check} onChange={handleCheckBox} />
                                            </TableCell>
                                            <TableCell align="right" component="th" scope="row">
                                                {message.fullName}
                                            </TableCell>
                                            <TableCell align="right">{message.phone}</TableCell>
                                            <TableCell align="right">{message.email}</TableCell>
                                            <TableCell align="right">{message.message}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ borderBottom: '1px solid black' }}>כללי</h3>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" >נקרא</TableCell>
                                        <TableCell align="right">שם</TableCell>
                                        <TableCell align="right">טלפון</TableCell>
                                        <TableCell align="right">מייל</TableCell>
                                        <TableCell align="right">הנכס</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {messageByName.map((message, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="right" component="th" scope="row">
                                                <input type='checkBox' name='id' checked={message.check} onChange={handleCheckBox} />
                                            </TableCell>
                                            <TableCell align="right" component="th" scope="row">
                                                {message.name}
                                            </TableCell>
                                            <TableCell align="right">{message.phone}</TableCell>
                                            <TableCell align="right">{message.email}</TableCell>
                                            <TableCell align="right">{message.itemName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <button onClick={updateDetails}>עדכן את הפרטים</button>
            </div>

        </div>
    )
}
export default CheckMessage;