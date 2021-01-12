import React, { useContext, useRef, useEffect, useState } from 'react';

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useHistory } from 'react-router-dom';
// import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { setRTLTextPlugin } from 'react-map-gl';
import Header from '../../header';
import { Grid, IconButton } from '@material-ui/core';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import { useItems } from '../../../context/itemContext';
import Card from '../../card';
import RoomIcon from '@material-ui/icons/Room';
import { useLocation } from 'react-router-dom';
import "mapbox-gl/dist/mapbox-gl.css";
// const functions = require('firebase-functions')
// import config from '../../../env.json';

const styles = {

    position: 'relative',
    width: '100%',
    height: '100%'


};

const ApartmentSell = () => {
    const apartment = useItems().apartment
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

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    // useEffect(() => {
    //     mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    //     var map = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [34.794010, 31.976840],
    //         zoom: 11
    //     });

    //     map.on('load', function () {
    //         map.addSource('places', {
    //             'type': 'geojson',
    //             'data': {
    //                 'type': 'FeatureCollection',
    //                 'features': [...apartment]
    //             }
    //         });
    //         // Add a layer showing the places.
    //         map.addLayer({
    //             'id': 'places',
    //             'type': 'symbol',
    //             'source': 'places',
    //             'layout': {
    //                 'icon-image': '{icon}-15',
    //                 'icon-allow-overlap': true
    //             }
    //         });

    //         // When a click event occurs on a feature in the places layer, open a popup at the
    //         // location of the feature, with description HTML from its properties.
    //         map.on('click', 'places', function (e) {
    //             var coordinates = [e.features[0].lat, e.features[0].lon]
    //             var description = e.features[0].name

    //             // Ensure that if the map is zoomed out such that multiple
    //             // copies of the feature are visible, the popup appears
    //             // over the copy being pointed to.
    //             // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //             //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //             // }

    //             new mapboxgl.Popup()
    //                 .setLngLat(coordinates)
    //                 .setHTML(description)
    //                 .addTo(map);
    //         });

    //         // Change the cursor to a pointer when the mouse is over the places layer.
    //         map.on('mouseenter', 'places', function () {
    //             map.getCanvas().style.cursor = 'pointer';
    //         });

    //         // Change it back to a pointer when it leaves.
    //         map.on('mouseleave', 'places', function () {
    //             map.getCanvas().style.cursor = '';
    //         });
    //     });
    //     // const initializeMap = ({ setMap, mapContainer }) => {
    //     //     const map = new mapboxgl.Map({
    //     //         container: mapContainer.current,
    //     //         style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    //     //         center: [34.794010, 31.976840],
    //     //         zoom: 11
    //     //     });

    //     //     map.on('load', () => {
    //     //         apartment.forEach(item => {
    //     //             console.log('salfnasl')
    //     //             if (item.lat && item.lon) {
    //     //                 var marker = new mapboxgl.Marker()
    //     //                     .setLngLat([Number(item.lon), Number(item.lat)])
    //     //                     .addTo(map);
    //     //             }
    //     //         })
    //     //     })


    //     //     map.on('click', function (e) {
    //     //         console.log('click')
    //     //         var coordinates = [Number(e.lon), Number(e.lat)]
    //     //         var description = <span>'hello'</span>
    //     //         // features[0].geometry.coordinates.slice()
    //     //         // Ensure that if the map is zoomed out such that multiple
    //     //         // copies of the feature are visible, the popup appears
    //     //         // over the copy being pointed to.
    //     //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     //         }

    //     //         new mapboxgl.Popup()
    //     //             .setLngLat(coordinates)
    //     //             .setHTML(description)
    //     //             .addTo(map);
    //     //     });

    //     //     map.on("load", () => {
    //     //         setMap(map);
    //     //         map.resize();
    //     //     });
    //     // };

    //     // if (!map) initializeMap({ setMap, mapContainer });
    // }, [map, apartment]);
    // // useEffect(() => {
    // //     if (Object.keys(functions.config()).length) {
    // //         config = functions.config().service.mapbox;
    // //     }
    // // }, [])

    // useEffect(() => {
    //     console.log(apartment)

    // }, [apartment])

    const x = (item) => {
        history.push({ state: item, pathname: `/apartmentPage/${item.itemId}` })
    }

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>

            <Header stat={true} backgroundColor={true} />
            {/* <div style={{ height: '60vh' }}>
                <div ref={el => (mapContainer.current = el)} style={styles} />
            </div> */}
            <div className='map-padding'>
                <ReactMapGL

                    {...viewport}
                    width='100%'
                    height="60vh"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken="pk.eyJ1IjoibGlkb3IxMTAxMTAiLCJhIjoiY2tqbGl1MHM1NjNoNTJ5bGczd2txbTFhbiJ9.aV22o32mHGSUNS4ubsSfOw"
                >
                    {apartment.map(apartment => {
                        if (apartment.lat && apartment.lon) {
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
                            <Card item={item}
                                cardName='apartment-card'
                                imgClass='image-sell-apartment'
                                onClick={x}
                            />

                        </Grid>
                    })}
                </Grid>
            </div>
            <Footer />
            <FooterSticky />

        </div>
    )
}

export default ApartmentSell;