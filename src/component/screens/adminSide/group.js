import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import HeaderLogin from './com/headerAdmin';
import DefaultPage from '../../defaultPage';
import firebase from '../../../firebase';
// import Card from '../../../card';

const Group = () => {

    const theFirebase = useFirebase();

    const history = useHistory()
    useFirebaseConnect([
        'group',
        'manager',
        'collaboration'
    ])

    const group = useSelector(state => state.firebase.data.group)
    const manager = useSelector(state => state.firebase.data.manager)
    const collaboration = useSelector(state => state.firebase.data.collaboration)

    const handleUpload = (e) => {
        console.log(e)
        console.log('asflaslasnkl')

        history.push({ pathname: '/login/addToGroup', state: e });
    }

    const handleEdit = (person, m) => {
        console.log(m)
        console.log('edit', person)
        if (m == 'manager') {
            history.push({ pathname: '/login/editGroup/manager', state: m })
        } else {
            history.push({ pathname: `/login/editGroup/${person.id}`, state: m })
        }
    }
    const handleDelete = (person, m) => {
        console.log('delete', person)
        if (m == 'group') {
            firebase.database().ref(`/group/${person.id}`).remove().then(() => {
                theFirebase.deleteFile(person.img.fullPath).then(() => {
                    console.log('remove image')
                }).then(() => window.location.reload(false)).catch(err => console.log(err))
            }).catch((err) => console.log('data base', err))
        } else {
            firebase.database().ref(`/manager`).remove().then(() => {
                theFirebase.deleteFile(person.img.fullPath).then(() => {
                    console.log('remove image')
                })
            })

        }

    }
    const groupIsNotEmpty = (group, m) => {
        console.log(group)
        return <div>
            <h3 style={{ padding: '2rem' }}>{m == 'collaboration' ? 'שת"פ' : 'הצוות'}</h3>
            {Object.values(group).map((p, i) => {
                if (p) {
                    let { img, name, des, role } = p;
                    return <div key={i} style={{ marginBottom: '1rem', textAlign: 'right' }}>
                        <div style={{ flexDirection: 'row', display: 'flex' }}>
                            <img src={img.url} style={{ height: '15rem', width: 'auto' }} />
                            <div style={{ marginRight: '2rem' }}>
                                <h4>{name}</h4>
                                <h6>{role}</h6>
                                <span>{des}</span>
                            </div>
                        </div>
                        <button style={{ margin: '1rem' }} onClick={() => handleEdit(p, m)}>ערוך</button>
                        <button style={{ color: 'red' }} onClick={() => handleDelete(p, m)}>מחק</button>
                    </div>

                }
            })
            }
        </div>
    }
    // const groupIsNotEmpty = (group) => {
    //     console.log(group)
    //     return <div>
    //         <h3 style={{ padding: '2rem' }}>הצוות</h3>
    //         {Object.values(group).map((p, i) => {
    //             if (p) {
    //                 let { img, name, des, role } = p;
    //                 return <div key={i} style={{ marginBottom: '1rem', textAlign: 'right' }}>
    //                     <div style={{ flexDirection: 'row', display: 'flex' }}>
    //                         <img src={img.url} style={{ height: '15rem', width: 'auto' }} />
    //                         <div style={{ marginRight: '2rem' }}>
    //                             <h4>{name}</h4>
    //                             <h6>{role}</h6>
    //                             <span>{des}</span>
    //                         </div>
    //                     </div>
    //                     <button style={{ margin: '1rem' }} onClick={() => handleEdit(p, 'group')}>ערוך איש צוות</button>
    //                     <button style={{ color: 'red' }} onClick={() => handleDelete(p, 'group')}>מחק איש צוות</button>
    //                 </div>

    //             }
    //         })
    //         }
    //     </div>
    // }

    if (!isLoaded(group) && !isLoaded(manager) && !isLoaded(collaboration)) {
        return <div>loading...</div>
    }

    return (
        <>
            <HeaderLogin />
            <div style={{ padding: '0 5rem 0', textAlign: 'center' }}>
                <h3 style={{ margin: '1rem' }}>הצוות</h3>
                <button style={{ margin: '2rem' }} onClick={() => handleUpload('group')}>הוסף איש צוות חדש</button>
                <button style={{ margin: '2rem' }} onClick={() => handleUpload('collaboration')}>הוסף איש שת"פ</button>
                {/* <button style={{ margin: '2rem' }} onClick={handleUpload}>הוסף איש צוות חדש</button> */}
                <hr />
                {isEmpty(manager) ?
                    <div>
                        <span>כרגע לא קיים מנהל</span>
                        <br />
                        <button style={{ margin: '1rem' }} onClick={() => handleUpload('manager')}>הוסף מנהל</button>
                    </div>
                    : <div style={{ marginBottom: '1rem' }}>
                        <h3>מנהל החברה</h3>
                        <img src={manager.img.url} style={{ height: '15rem', width: 'auto' }} />

                        <h4>{manager.name}</h4>
                        <h6>{manager.role}</h6>
                        <span>{manager.des}</span>
                        <br />
                        <button style={{ margin: '1rem' }} onClick={() => handleEdit(manager, 'manager')}>ערוך איש צוות</button>
                        <br />
                        <button style={{ color: 'red' }} onClick={() => handleDelete(manager, 'manager')}>מחק איש צוות</button>
                    </div>
                }
                <hr />
                {!isEmpty(group) && groupIsNotEmpty(group, 'group')}
                <hr />
                {!isEmpty(collaboration) && groupIsNotEmpty(collaboration, 'collaboration')}
            </div>
        </>
    )
}
export default Group;