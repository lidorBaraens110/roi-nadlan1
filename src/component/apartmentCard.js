import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {

        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '0',
        boxShadow: 'none'
    },
    media: {
        height: '400px',

    },
});


export default function ApartmentCard({ itemId,
    name,
    address,
    size,
    floor,
    rooms,
    parking,
    balcony,
    elevator,
    enterDate,
    freeContext,
    lat,
    lon,
    images, onClick
}) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ cursor: 'pointer', textAlign: 'center', height: '40%' }} onClick={onClick}>
            {images && <img src={images[0].url} height='100%' width='100%' />}
            <div style={{ flex: '1' }}>
                <Typography> {name}</Typography>
                <Typography>{address}</Typography>
                <Typography>{rooms}</Typography>
            </div>
        </div>
    );
}
