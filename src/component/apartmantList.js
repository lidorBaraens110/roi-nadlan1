import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem } from '@material-ui/core';
import firebase from 'firebase';

const ApartmentList = () => {
    const [apartments, setApartment] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <Grid container>
            {apartment.map((apartment, i) => {
                <Grid item
                    s={12} md={12} lg={6} xl={6}>
                    <div>
                        <img />
                        <div>
                            <text>{apartment.room}</text>
                            <text>{apartment.address}</text>
                            <text>{apartment.mr}</text>
                        </div>
                    </div>
                </Grid>
            })}
        </Grid>
    );
}
export default ApartmentList;