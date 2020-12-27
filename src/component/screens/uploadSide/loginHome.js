import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderLogin from '../../../component/headerLogin';
// import Loader from 'react-loader-spinner';
import { Grid, Button, Typography } from '@material-ui/core';
import firebase from '../../../firebase';
import ApartmentCard from '../../apartmentCard';





const LoginHome = () => {
    const history = useHistory()
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadItems();
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
                    setItemList(preValue => [...preValue, data[item]])

                }
                setLoading(false)
            }
        })
    }

    const editItem = (item) => {
        console.log(item)
        history.push({ pathname: '/login/editItem', state: item })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <HeaderLogin />
            {loading ? <div>d</div> :
                /* <Loader
                    style={{ padding: '10%' }}
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={5000} //3 secs
                /> : */
                (itemList.length > 0 && <Grid container justify='space-between' >
                    {itemList.map((item, i) => {
                        console.log(item);
                        return <Grid item
                            style={{
                                padding: '2rem'
                            }}
                            key={i}
                            sm={12} md={12} lg={6} xl={6}
                        >
                            <ApartmentCard rooms={item.rooms} name={item.name} address={item.address} onClick={() => editItem(item)} images={item.images} />
                        </Grid>
                    })}

                </Grid>
                )
            }
        </div >
    )
}

export default LoginHome;