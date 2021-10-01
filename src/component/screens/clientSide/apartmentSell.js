import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../../header';
import { Grid, IconButton } from '@material-ui/core';
import Footer from '../../footer';
import Card from '../../card';
import RoomIcon from '@material-ui/icons/Room';
import { useLocation, useParams } from 'react-router-dom';
import "mapbox-gl/dist/mapbox-gl.css";
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import logo from '../../../assets/loggo.png';


const ApartmentSell = () => {

    const location = useLocation();
    const history = useHistory();
    const { type } = useParams();


    useFirebaseConnect([
        `apartments/${type}`,

    ])
    const apartments = useSelector(state => state.firebase.ordered.apartments && state.firebase.ordered.apartments[type])
    const [page, setPage] = useState(1)
    const [countPage, setCountPage] = useState();
    const [apartmentsToShow, setApartmentToShow] = useState([])
    const [selectedPark, setSelectedPark] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 32.011261,
        longitude: 34.774811,
        zoom: 12,
        bearing: 0,
        pitch: 0,
    });
    const selectedRef = useRef(null)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    function checkWhereClick(e) {
        if (selectedRef.current != null) {
            if (!selectedRef.current._contentRef.current.contains(e.target)) {
                setSelectedPark(null)
                selectedRef.current = null
            }
        }
    }

    useEffect(() => {
        let currentApartments = []

        if (isLoaded(apartments) && !isEmpty(apartments)) {
            currentApartments = apartments.filter((apartment, i) => {
                return i < (page * 11)
            })
            setApartmentToShow(currentApartments)
            setCountPage(Math.ceil(apartments.length / 10))
        }
    }, [apartments])

    useEffect(() => {
        document.addEventListener('mousedown', checkWhereClick)
        return () => {

            document.removeEventListener("mousedown", checkWhereClick);
        };
    }, [checkWhereClick])

    const handleClickMapObject = (selected) => {
        history.push(`/apartmentPage/${type}/${selected.itemId}`)
    }

    const handleChange = (event, value) => {
        setPage(value);
        setApartmentToShow(apartments.filter((z, i) => {
            return ((value - 1) * 10) <= i && i < ((value * 10) + 1)
        }))
        window.scrollTo(0, 400)
    };

    const navigationToApartment = (item, type) => {
        history.push({ pathname: `/apartmentPage/${type}/${item.itemId}` })
    }

    if (!isLoaded(apartments)) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} className='blink-image' />
        </div>
    }


    return (
        <div style={{ textAlign: 'center', backgroundColor: '#F3F3F1' }}>
            <Header stat={true} backgroundColor={true} />
            <div className='map-padding'>
                <h3 style={{ margin: '1rem 0 0.5rem' }}>נכסים {type == 'forSell' ? 'למכירה' : 'להשכרה'}</h3>

                {!isEmpty(apartments) && <h5 style={{ border: '1px gray dashed' }}>במפה תוכלו לראות את כל הנכסים הרלוונטים {type == 'forSell' ? 'למכירה' : 'להשכרה'}</h5>}
            </div>
            {!isEmpty(apartments) ? <><div className='map-padding'>
                <ReactMapGL
                    {...viewport}
                    width='100%'
                    height="50vh"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                >
                    {apartments.map(apartment => {
                        if (apartment.value.lat && apartment.value.lon && !apartment.value.sell) {
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
                            ref={selectedRef}
                            latitude={Number(selectedPark.lat)}
                            longitude={Number(selectedPark.lon)}
                            onClose={() => {
                                setSelectedPark(null);
                            }}
                            closeOnClick={false}
                        >
                            <div key={selectedPark.address} onClick={() => handleClickMapObject(selectedPark)}>
                                <img src={selectedPark.images[0].url} className='image-map' />
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>{selectedPark.address}, {selectedPark.city}</p>
                                {selectedPark.favorites && <div style={{ textAlign: 'right', padding: 0, margin: 0, fontSize: '0.7rem' }}>
                                    <p style={{ margin: 0 }}>*מקומות מרכזיים</p>
                                    {selectedPark.favorites.map((fav, i) => {
                                        return <div><span key={i}>{fav}</span><br /></div>
                                    })}
                                    <button onClick={() => console.log('click button')}>click</button>
                                </div>
                                }
                            </div>
                        </Popup>
                    ) : null}

                </ReactMapGL>
            </div>

                <div className='apartments-sell-section'>
                    <Grid container
                        // className='grid-apartment-sell'
                        space={5}
                        alignItems='center'
                        alignContent='center'
                        style={{ margin: '2rem 0', width: '100%', maxWidth: '100%' }}

                    >
                        {apartmentsToShow.map((item, i) => {
                            return <Grid item key={i}
                                className='apartments-sell-grid-item'
                                // style={{ padding: '1rem' }}
                                xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card item={item.value}
                                    type={type}
                                    cardName='apartment-card'
                                    imgClass='image-sell-apartment'
                                    onClick={navigationToApartment}
                                />

                            </Grid>
                        })}
                    </Grid>
                </div>
                <Pagination style={{ justifyContent: 'center', marginBottom: '1rem', display: 'flex' }}
                    count={countPage} page={page} onChange={handleChange} color="primary" />
            </>
                : <div style={{ height: '70vh', textAlign: 'center', flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <h5>כרגע לא קיימים נכסים {type == 'forSell' ? 'למכירה' : 'להשכרה'}</h5>
                    <h6>בקרוב ייפתחו נכסים חדשים {type == 'forSell' ? 'למכירה' : 'להשכרה'}</h6>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUX-VWjndPzziLoFFtCdWHs_G2e9GpMl5dqQ&usqp=CAU' />
                </div>}
            <Footer />


        </div>
    )
}

export default ApartmentSell;