import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from '../../header';
import Footer from '../../footer';
import FooterSticky from '../../footerSticky';
import HandShake from '../../../assets/hand-shake.png';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';


const TheGroup = () => {

    useFirebaseConnect([
        'manager',
        'group',
        'collaboration'
    ])

    const manager = useSelector(state => state.firebase.data.manager)
    const group = useSelector(state => state.firebase.ordered.group)
    const collaboration = useSelector(state => state.firebase.ordered.collaboration)

    const location = useLocation()
    const [mobileView, setMobileView] = useState();
    useEffect(() => {
        const setResponsiveness = () => {
            console.log('hellp')
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);
    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f2f2f2' }}>
            <Header stat={true} backgroundColor={true} />
            {!isLoaded(manager) ? <CircularProgress /> :
                !isEmpty(manager) &&
                <div className='group-manager-div'>
                    <img src={manager.img.url} style={{ height: '200px' }} />
                    <div className='group-subDiv'>
                        <h3 >{manager.name}</h3>
                        <h5>{manager.role}</h5>
                        <span style={{ lineHeight: 2 }}>{manager.des}</span>
                    </div>
                </div>
            }
            {!isLoaded(group) ? <CircularProgress /> :
                !isEmpty(group) &&
                group.map(p => {
                    if (p.value) {
                        return <div key={p.key} className='group-manager-div' >
                            <img src={p.value.img.url} style={{ height: '200px' }} />
                            <div className='group-subDiv'>
                                <h3 >{p.value.name}</h3>
                                <h5>{p.value.role}</h5>
                                <span>{p.value.des}</span>
                            </div>
                        </div>
                    }
                })
            }

            {!isLoaded(collaboration) ? <CircularProgress /> :
                !isEmpty(collaboration) && <><h3 style={{ marginTop: '5rem' }}>one-stop-shop</h3>
                    <h5>בשיתוף פעולה עם</h5>

                    {collaboration.map(col => {
                        if (col.value) {
                            return <div key={col.key} className='group-manager-div' >
                                <img src={col.value.img.url} style={{ height: '200px' }} />
                                <div className='group-subDiv'>
                                    <h3 >{col.value.name}</h3>
                                    <h5>{col.value.role}</h5>
                                    <span>{col.value.des}</span>
                                </div>
                            </div>
                        }
                    })
                    }
                </>
            }


            <Footer />

        </div >
    )
}

{/* <div style={{ margin: '4rem 5rem', textAlign: 'right', display: 'flex', flexDirection: 'row' }}>
                        <img src={ItzikImg} style={{ height: '200px', width: 'auto', marginLeft: '2rem' }} />
                        <div style={{ height: '200px' }}>
                            <h3 >איציק שילו</h3>
                            <h5>מנהל שיווק</h5>
                            <span>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                </div>
                : <div style={{ padding: '1rem' }}>
                    <h3>על הצוות</h3>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={RoiMobileImg} style={{ marginBottom: '1rem' }} />

                        <h5 >רועי רינט</h5>
                        <h6>מנכל ובעלים של קבוצת רינט</h6>
                        <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                            <span style={{ fontSize: '0.8rem' }}>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={AyeletImg} style={{ marginBottom: '1rem' }} />

                        <h5 >איילת הופמן זוארץ</h5>
                        <h6>מתכננת ומעצבת פנים</h6>
                        <div style={{
                            textAlign: 'right', lineHeight: 1.2
                        }}>
                            <span style={{ fontSize: '0.8rem' }}>איילת הופמן זוארץ (40), מתכננת ומעצבת פנים, מתמחה בהשבחות נדל"ן והום סטייג'ינג,תכנון מחדש ועיצוב פנים של דירות ובתים
                            אמא ל-2 ילדים, מתגוררת בראשון.
                            יצירתיות הם שם המפתח אצל איילת, היא אמנית ומביאה לידי ביטוי בכל תחומי עיסוקה את היצירתיות והחשיבה מחוץ לקופסא.
איילת היא פדנטית וחושבת על כל הפרטים הקטנים כגדולים. התכונות האלה ביחד מסייעות לה בכל פרויקט אליו היא ניגשת.</span>
                        </div>
                    </div>
                    <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                        <img src={ItzikImg} style={{ marginBottom: '1rem' }} />
                        <h5 >איציק שילה</h5>
                        <h6>מנהל שיווק</h6>
                        <div style={{
                            textAlign: 'right', lineHeight: 1.2
                        }}>
                            <span style={{ fontSize: '0.8rem' }}>מנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינטמנכל ובעלים של קבוצת רינט</span>
                        </div>
                    </div>

                    <img src={HandShake} />
                </div>
            } */}



export default TheGroup;