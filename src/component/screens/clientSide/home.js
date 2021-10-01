import React, { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import SwipeImages from '../../imageCardSlide';
import Header from '../../header'
import Footer from '../../footer';
import { useLocation } from 'react-router-dom';
import GroupCom from '../../groupCom';
import RecommendedSwipe from '../../recommendedSwipe';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ContactCommon from '../../contactCommon';
import DefaultPage from '../../defaultPage';
const Home = () => {

    useFirebaseConnect([
        'apartments/forSell',
        'apartments/forRent',
        'messages',
        'recommended',
        'features/features',
        'features/title',
        'contact'

    ])

    const features = useSelector(state => state.firebase.ordered.features && state.firebase.ordered.features['features'])
    const featuresTitle = useSelector(state => state.firebase.data.features && state.firebase.data.features['title'])
    const apartmentsForSell = useSelector((state) => state.firebase.ordered.apartments && state.firebase.ordered.apartments['forSell'])
    const apartmentsForRent = useSelector((state) => state.firebase.ordered.apartments && state.firebase.ordered.apartments['forRent'])
    const recommended = useSelector(state => state.firebase.ordered.recommended)
    const contact = useSelector(state => state.firebase.data.contact)
    const location = useLocation()
    const history = useHistory()
    const [mobileView, setMobileView] = useState()
    const [allApartmentB, setAllApartmentB] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(false)

    useEffect(() => {
        const setBackground = () => {
            if (window.pageYOffset > 50) {
                setBackgroundColor(true)
            } else {
                setBackgroundColor(false)
            }
        }
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("scroll", () => setBackground());
        window.addEventListener("resize", () => setResponsiveness());
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const navigateToApartments = (type) => {
        history.push(`/apartments/${type}`)
    }

    const navigateToApartment = (item, type) => {
        history.push({ pathname: `/apartmentPage/${type}/${item.itemId}` })
    }
    //check if loaded
    if (!isLoaded(apartmentsForRent) || !isLoaded(apartmentsForSell) || !isLoaded(recommended) || !isLoaded(features) || !isLoaded(contact)) {
        return <DefaultPage />
    }

    return (

        <div style={{
            textAlign: 'center', backgroundColor: '#eaeaea'
        }} >

            <Header stat={mobileView ? true : false} backgroundColor={mobileView ? true : backgroundColor} />

            {!isEmpty(contact) && contact.mainPhoto.url && <div className='sub-header'>
                <div className='logo-subheader'>
                    <h1 className='sub-h1'>{contact.mainSentence}</h1>
                    <h3 className='sub-h3'>{contact.subSentence}</h3>
                </div>
                <img src={contact.mainPhoto.url} className='image-subheader' />
            </div>
            }

            {!mobileView && <ContactCommon
                type='home'
                messageType='generalMessages'
                itemName=''
            />}

            <div style={{
                padding: !mobileView && '0 4rem', textAlign: 'center',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>

                {!isLoaded(apartmentsForSell) ? <CircularProgress /> :
                    !isEmpty(apartmentsForSell) && <div style={{ marginTop: !mobileView && '2rem ', padding: !mobileView && '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: !mobileView ? 'row' : 'column', justifyContent: 'space-between', padding: mobileView && '1rem' }}>
                            <h5>דירות למכירה</h5>
                            <Button onClick={() => navigateToApartments('forSell')}
                                variant='contained'
                                onMouseOver={() => setAllApartmentB(true)}
                                onMouseLeave={() => setAllApartmentB(false)}
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: allApartmentB ? 'white' : '#181615',
                                    border: '1px solid black'
                                }}
                            ><span style=
                                {{ color: allApartmentB ? '#181615' : 'white', fontSize: mobileView && '0.8rem' }}>
                                    לכל הנכסים </span> </Button>
                        </div>
                        <SwipeImages items={apartmentsForSell} type={'forSell'} onClick={navigateToApartment} />
                    </div>
                }

                {!isLoaded(apartmentsForRent) ? <CircularProgress /> :
                    !isEmpty(apartmentsForRent) && <div style={{ marginTop: !mobileView && '2rem ', padding: !mobileView && '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: !mobileView ? 'row' : 'column', justifyContent: 'space-between', padding: mobileView && '1rem' }}>
                            <h5 >דירות להשכרה</h5>
                            <Button onClick={() => navigateToApartments('forRent')}
                                variant='contained'
                                onMouseOver={() => setAllApartmentB(true)}
                                onMouseLeave={() => setAllApartmentB(false)}
                                style={{ borderRadius: 0, backgroundColor: allApartmentB ? 'white' : '#181615', border: '1px solid black' }}
                            ><span style=
                                {{ color: allApartmentB ? '#181615' : 'white', fontSize: mobileView && '0.8rem' }}>
                                    לכל הנכסים</span> </Button>
                        </div>

                        <SwipeImages items={apartmentsForRent} type={'forRent'} onClick={navigateToApartment} />
                    </div>
                }
                <div style={{ padding: '2rem', marginTop: '2rem', backgroundColor: '#DCEEEA' }}>
                    {!isEmpty(features) && <h3 style={{ marginBottom: '2rem' }} >{featuresTitle}</h3>}
                    <Grid container spacing={5} style={{ margin: '0', width: '100%', padding: '1rem' }}>
                        {!isEmpty(features) ? features.map(feature => {
                            if (feature.value) {
                                return <Grid item key={feature.key} xs={12} sm={12} md={4} lg={4} xl={4}>
                                    {feature.value.icon.url && <img src={feature.value.icon.url} height='80px' alt='תמונת נושא' />}
                                    <h4 style={{ padding: '0.5rem 0', color: '#292e38', fontSize: mobileView && 'larger' }}>{feature.value.title}</h4>
                                    <span style={{ paddingTop: '1rem', lineHeight: 1.2, fontSize: '1rem', color: '#292e38' }}>
                                        {feature.value.des}</span>
                                </Grid>
                            }
                        })
                            : console.log(features)
                        }
                    </Grid>
                </div>
                <div style={{ backgroundColor: '#E5F4E3', marginTop: '2rem' }}>
                    {isLoaded(recommended) && !isEmpty(recommended) && <RecommendedSwipe recommended={recommended} />}
                </div>
                <GroupCom />
            </div>
            <Footer />
        </div >

    )
}

export default Home;