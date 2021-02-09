import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Card from '@material-ui/core/Card';
import { autoPlay } from 'react-swipeable-views-utils';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const RecommendedSwipe = ({ recommended }) => {

    const [recommendedState, setRecommendedState] = useState(recommended)
    const [auto, setAuto] = useState(true);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const handleSwitching = (e) => {
        setIndex(e)
    }

    return (
        <div className='home-recommended'>

            <h3 style={{ padding: '3rem 0 2rem' }}>לקוחות מרוצים שהפכו למשפחה &hearts; </h3>


            <AutoPlaySwipeableViews autoplay={auto} onMouseOver={() => setAuto(false)} onMouseLeave={() => setAuto(true)} interval={4000} style={{ textAlign: 'center' }} enableMouseEvents index={index} onChangeIndex={handleSwitching}>
                {recommended.map((rec) => {
                    if (rec.value) {
                        return <div key={rec.key}
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <div className='recommended-card-home' >
                                <span style={{ fontSize: '1rem' }}>{rec.value.name}</span>
                                <hr style={{ backgroundColor: 'black', margin: '0 0 0.5rem' }} />
                                <span style={{ whiteSpace: 'pre-line' }}>{rec.value.content}</span>
                            </div>
                            <Dialog
                                style={{ textAlign: 'center' }}
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">ההמלצה המקורית</DialogTitle>
                                <DialogContent>
                                    <img src={recommended[index].value.img.url} alt='pictures' width='100%' className='image-recommended' />
                                </DialogContent>
                                <DialogActions>

                                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                                        close
                              </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    }
                })}
            </AutoPlaySwipeableViews >
            <div>
                {
                    recommended.map((pic, i) => {
                        return <div
                            onClick={() => setIndex(i)}
                            key={i}
                            id={i}
                            style={{
                                cursor: 'pointer',
                                padding: '0.3rem',
                                marginLeft: '0.3rem',
                                display: "inline-block",
                                backgroundColor: i === index ? 'black' : 'white',
                                borderRadius: '100%',
                                border: 'solid black 1px'
                            }} ></div>
                    })
                }
                <br />


                <Button onClick={() => setOpen(preVal => !preVal)} style={{ padding: '0.5 1rem', backgroundColor: '#4169E1', color: 'white', fontWeight: '500', borderRadius: '0%' }}>
                    להמלצה המקורית
                </Button>

            </div>
            {/* <div >
                <span ></span>
            </div> */}
        </div >


    )
}
export default RecommendedSwipe;