import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIcon from '@material-ui/icons/PhoneInTalk';
import logo from '../assets/loggo.png';
import { useHistory } from 'react-router-dom';
import { Divider, List, ListItem } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    root: {

        flexGrow: 1,
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,

    },
}));

export default function ButtonAppBar({ stat, backgroundColor }) {
    const facebookSite = 'https://www.facebook.com/%D7%A8%D7%95%D7%A2%D7%99-%D7%A8%D7%99%D7%A0%D7%98-%D7%99%D7%95%D7%A2%D7%A5-%D7%95%D7%9E%D7%A9%D7%95%D7%95%D7%A7-%D7%A0%D7%93%D7%9C%D7%9F-375132793057269'
    const [mobileView, setMobileView] = useState(false)
    const [drawer, setDrawer] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false);
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

    }, []);


    const handleCall = () => {

    }

    const handleDrawer = () => {
        setDrawer(pre => !pre)
    }
    const link = (param) => {
        history.push('/' + param);
    }
    return (
        <div className={classes.root} >
            <AppBar style={{ position: stat && 'static', background: !backgroundColor && 'none', backgroundColor: !backgroundColor ? 'none' : 'white', color: !backgroundColor ? '#0D1B3D' : 'black' }}>
                {mobileView ?
                    <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0.5rem' }}>

                        <IconButton onClick={handleDrawer} edge="start" className={classes.menuButton} color='primary' aria-label="menu">
                            <MenuIcon fontSize='medium' />
                        </IconButton>
                        <Drawer
                            {...{
                                anchor: "right",
                                open: drawer,
                                onClose: handleDrawer,
                            }}
                        >

                            <List style={{ textAlign: 'right', padding: '1rem ' }}>
                                <div onClick={handleDrawer} style={{ cursor: 'pointer', textAlign: 'left' }}>
                                    <HighlightOffIcon />
                                </div>
                                <ListItem>
                                    <Button onClick={() => link('apartmentSell')}>
                                        <span style={{ fontSize: '1.2rem', color: '#5F5A46' }} >דירות למכירה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('apartmentRent')}>
                                        <span style={{ fontSize: '1.2rem', color: '#5F5A46' }} >דירות להשכרה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('ourStory')}>
                                        <span style={{ fontSize: '1.2rem', color: '#5F5A46' }} >
                                            סיפורי ההצלחה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('theGroup')}>
                                        <span style={{ fontSize: '1.2rem', color: '#5F5A46' }}  >הצוות המנצח</span>
                                    </Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('contactUs')}> <span style={{ fontSize: '1.2rem', color: '#5F5A46' }} >צור קשר</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <div style={{ padding: '2rem 2rem 0', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row' }}>
                                        <IconButton style={{ padding: 0 }} href={facebookSite}>
                                            <FacebookIcon fontSize='large' style={{ color: 'blue' }} />
                                        </IconButton>
                                        <IconButton style={{ padding: 0 }}
                                            href='https://api.whatsapp.com/send?phone=+972526862409&text=%20שלום הייתי רוצה לשמוע הצעות לדירות לקניה'>
                                            <WhatsAppIcon fontSize='large' style={{ color: 'green' }} />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            </List>
                            <div></div>
                        </Drawer>
                        <div onClick={() => link('')} style={{ cursor: 'pointer' }}>
                            <img height='auto' width='120rem' src={logo} style={{ flex: 1 }} />
                        </div>

                        <IconButton href='tel:+972509677226'><PhoneIcon color='primary' fontSize='medium' /></IconButton>
                    </Toolbar>
                    : <Toolbar style={{ display: 'flex', flexDirection: 'row', textAlign: 'right', justifyContent: 'space-between', padding: '1rem' }}>
                        <div onClick={() => link('')} style={{ cursor: 'pointer', backgroundColor: 'white', opacity: '0.8', borderRadius: '20px 20px' }}><img height='auto' width='200rem' src={logo} style={{ flex: 1 }} />
                        </div>
                        <div style={{ textAlign: 'right', flex: 8, paddingRight: '1rem' }} >
                            <Button onClick={() => link('apartmentSell')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }} >דירות למכירה</span>
                            </Button>
                            <Button onClick={() => link('apartmentRent')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >דירות להשכרה</span>
                            </Button>
                            <Button onClick={() => link('ourStory')}> <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >סיפורי ההצלחה</span></Button>
                            <Button onClick={() => link('theGroup')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >הצוות המנצח</span>
                            </Button>
                            <Button onClick={() => link('contactUs')}> <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >צור קשר</span></Button>
                        </div>
                        <Button href='tel:+972509677226' style={{ flex: 1 }}
                            style={{ color: '#5F5A46' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }} onClick={handleCall}>0509677226</span>

                            <IconButton ><PhoneIcon style={{ color: 'blue' }} fontSize='inherit' /></IconButton></Button>

                    </Toolbar>
                }

            </AppBar>
        </div>
    );
}
