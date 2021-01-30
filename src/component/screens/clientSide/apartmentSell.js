import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useHistory } from 'react-router-dom';
import Header from '../../header';
import { Grid, IconButton } from '@material-ui/core';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import { useItems } from '../../../context/itemContext';
import Card from '../../card';
import RoomIcon from '@material-ui/icons/Room';
import { useLocation } from 'react-router-dom';
import "mapbox-gl/dist/mapbox-gl.css";
import { useFirebase } from 'react-redux-firebase';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/loggo.png';


const ApartmentSell = () => {

    useFirebaseConnect([
        `items`
        // { path: '/todos' } // object notation
    ])
    const apartment = useSelector(state => state.firebase.ordered.items)
    const location = useLocation();
    const history = useHistory();
    const [viewport, setViewport] = useState({
        latitude: 32.011261,
        longitude: 34.774811,
        zoom: 12,
        bearing: 0,
        pitch: 0,
    });
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);


    const x = (item) => {
        history.push({ state: item, pathname: `/apartmentPage/${item.itemId}` })
    }

    if (!isLoaded(apartment)) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} className='blink-image' />

        </div>
    }
    // else {
    //     return <button onClick={() => console.log(apartment)}>checkbox</button>
    // }

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>

            <Header stat={true} backgroundColor={true} />
            <div className='map-padding'>
                <ReactMapGL

                    {...viewport}
                    width='100%'
                    height="60vh"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                >
                    {apartment.map(apartment => {
                        if (apartment.value.lat && apartment.value.lon) {
                            return <Marker
                                key={apartment.value.itemId}


                                latitude={Number(apartment.value.lat)}
                                longitude={Number(apartment.value.lon)}
                            >
                                <IconButton

                                    className="marker-btn"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedPark(apartment.value);
                                    }}
                                >
                                    <RoomIcon fontSize='large' style={{ color: 'red' }} />
                                </IconButton>
                            </Marker>
                        }
                    })}
                    {selectedPark ? (
                        <Popup
                            latitude={Number(selectedPark.lat)}
                            longitude={Number(selectedPark.lon)}
                            onClose={() => {
                                setSelectedPark(null);
                            }}
                        >
                            <div>
                                <img src={selectedPark.images[1].url} className='image-map' />
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>{selectedPark.address}, {selectedPark.city}</p>
                                {selectedPark.favorites && <div style={{ textAlign: 'right', padding: 0, margin: 0, fontSize: '0.7rem' }}>
                                    <p style={{ margin: 0 }}>*מקומות מרכזיים</p>
                                    {selectedPark.favorites.map((fav, i) => {
                                        return <div><span key={i}>{fav}</span><br /></div>
                                    })}
                                </div>
                                }
                            </div>
                        </Popup>
                    ) : null}

                </ReactMapGL>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Grid container
                    className='grid-apartment-sell'
                    style={{ flexGrow: 1 }}

                >
                    {apartment.map((item, i) => {
                        return <Grid item key={i}
                            style={{ padding: '1rem 1rem 0', display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                            xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Card item={item.value}
                                cardName='apartment-card'
                                imgClass='image-sell-apartment'
                                onClick={x}
                            />

                        </Grid>
                    })}
                </Grid>
            </div>
            <Footer />
            {/* <FooterSticky /> */}

        </div>
    )
}

export default ApartmentSell;