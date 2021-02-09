import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from './com/headerAdmin';
import { useFirebase, useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';

const CheckMessage = () => {

    useFirebaseConnect([
        'messages/generalMessages',
        'messages/apartmentMessages'
    ])

    const generalMessages = useSelector(state => state.firebase.ordered.messages && state.firebase.ordered.messages['generalMessages']);
    const apartmentMessages = useSelector(state => state.firebase.ordered.messages && state.firebase.ordered.messages['apartmentMessages']);

    // const generalMessages = useItems().generalMessages;
    // const nameMessages = useItems().nameMessages
    const [general, setGeneral] = useState([])
    const [apartment, setApartment] = useState([])

    useEffect(() => {
        if (isLoaded(generalMessages) && !isEmpty(generalMessages)) {
            let newGeneral = []
            for (var item in generalMessages) {
                console.log(JSON.stringify(generalMessages[item].value) + 'khgkhkjhjlkhkhjg')
                newGeneral.push(generalMessages[item].value)
            }
            setGeneral(newGeneral)
        }



    }, [generalMessages])

    useEffect(() => {
        if (isLoaded(apartmentMessages) && !isEmpty(apartmentMessages)) {
            let newApartment = []
            for (var item in apartmentMessages) {
                newApartment.push(apartmentMessages[item].value)
            }
            setApartment(newApartment)
        }
    }, [apartmentMessages])

    const updateDetails = () => {
        console.log('upload processing')
        firebase.database().ref('/messages/generalMessages').set(general)
            .then(() => {
                alert('עודכן')
            })
            .catch(err => console.log(err))
        firebase.database().ref('/messages/apartmentMessages').set(apartment)
    }

    const handleCheckBox = (e, type) => {
        console.log(e.target.checked)
        console.log(e.target.name)
        const { name, checked } = e.target
        if (type === 'general') {

            const newGeneralMessage = general.map((message, x) => {
                if (message.id != name) {
                    return message
                } else {
                    Object.keys(message).map(key => {
                        if (key == 'check') {
                            message[key] = checked
                        }
                    })
                    return message
                }
            })
            setGeneral(newGeneralMessage)
            setTimeout(() => {
                console.log(newGeneralMessage)
            }, 3000)
        } else if (type === 'apartment') {
            // const gene
            const newApartmentMessage = apartment.map((message, x) => {
                if (message.id != name) {
                    return message
                } else {
                    Object.keys(message).map(key => {
                        if (key == 'check') {
                            message[key] = checked
                        }
                    })
                    return message
                }
            })
            setApartment(newApartmentMessage)
            setTimeout(() => {
                console.log(newApartmentMessage)
            }, 3000)
        }
    }


    if (!isLoaded(generalMessages) || !isLoaded(apartmentMessages)) {
        return <CircularProgress />
    }
    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '1rem' }}>הודעות שהשאירו באתר</h3>
                <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black', margin: '3%', padding: '0.5rem', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <h3 >כללי</h3>
                        <hr style={{ backgroundColor: 'black', margin: '1rem' }} />
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
                                    {!isEmpty(generalMessages) && general.map((message, i) => {
                                        console.log(i + JSON.stringify(message))
                                        if (message) {
                                            return <TableRow key={i} style={{ textDecoration: message.check && 'line-through' }
                                            } >
                                                <TableCell align="right" component="th" scope="row">
                                                    <input type='checkBox' name={message.id} checked={message.check} onChange={(e) => handleCheckBox(e, 'general')} />
                                                </TableCell>
                                                <TableCell align="right" component="th" scope="row">
                                                    {message.fullName}
                                                </TableCell>
                                                <TableCell align="right">{message.phone}</TableCell>
                                                <TableCell align="right">{message.email}</TableCell>
                                                <TableCell align="right">{message.message}</TableCell>

                                            </TableRow>
                                        }
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 >לפי נכס</h3>
                        <hr style={{ backgroundColor: 'black', margin: '1rem' }} />
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
                                    {!isEmpty(apartmentMessages) && apartment.map((message, i) => {
                                        if (message) {
                                            return <TableRow key={i} style={{
                                                textDecoration: message.check && 'line-through'
                                            }}>
                                                <TableCell align="right" component="th" scope="row">
                                                    <input type='checkBox' name={message.id} checked={message.check} onChange={(e) => handleCheckBox(e, 'apartment')} />
                                                </TableCell>
                                                <TableCell align="right" component="th" scope="row">
                                                    {message.name}
                                                </TableCell>
                                                <TableCell align="right">{message.phone}</TableCell>
                                                <TableCell align="right">{message.email}</TableCell>
                                                <TableCell align="right">{message.itemName}</TableCell>
                                            </TableRow>

                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <button onClick={updateDetails}>עדכן את הפרטים</button>
            </div>

        </div >
    )
}

export default CheckMessage;