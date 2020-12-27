import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { setRTLTextPlugin } from 'react-map-gl';
import Header from '../header';
import { Grid, IconButton } from '@material-ui/core';
import Footer from '../footer';
import FooterSticky from '../footerSticky';
import { useApartment } from '../../context/apartmentContext';
import Card from '../card';
import RoomIcon from '@material-ui/icons/Room';

const ApartmentSell = () => {
    const [viewport, setViewport] = useState({
        latitude: 31.961020,
        longitude: 34.801620,
        width: "100vw",
        height: "60vh",
        zoom: 10
    });
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {

        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);
    const apartment = useApartment()

    useEffect(() => {
        console.log(apartment)
    }, [])
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>

            <Header />
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                marks here
                {apartment.map(apartment => {
                return <Marker
                    key={apartment.itemId}
                    latitude={Number(apartment.lat)}
                    longitude={Number(apartment.lon)}
                >

                    <IconButton

                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            setSelectedPark(apartment);
                        }}
                    >
                        <RoomIcon fontSize='large' style={{ color: 'red' }} />
                    </IconButton>
                </Marker>
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
                            <img src={selectedPark.images[0].url} className='image-map' />
                            <h4>{selectedPark.address}</h4>
                            <div className='crop-map'>
                                <p>{selectedPark.name}</p>
                            </div>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
            <Grid container
                style={{ padding: '2% 15.5%' }}
                spacing={5}
            >
                {apartment.map((item, i) => {
                    return <Grid item key={i}
                        sm={12} md={6} lg={6} xl={6}>
                        <Card item={item}
                            styleCard={{ padding: '0.5rem', borderRadius: 0 }} />

                    </Grid>
                })}

            </Grid>
            <Footer />
            <FooterSticky />

        </div>
    )
}

export default ApartmentSell;