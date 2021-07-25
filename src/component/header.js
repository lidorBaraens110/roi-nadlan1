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
import { CircularProgress, Divider, List, ListItem } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

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


    useFirebaseConnect([
        'contact'
    ])

    const contact = useSelector(state => state.firebase.data.contact)
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


    const handleDrawer = () => {
        setDrawer(pre => !pre)
    }
    const link = (param) => {
        history.push('/' + param);
    }
    if (!isLoaded(contact)) {
        return <CircularProgress />
    }
    return (
        <div className={classes.root} >
            <AppBar style={{ position: stat && 'static', background: !backgroundColor && 'none', backgroundColor: !backgroundColor ? 'none' : '#f8f8f8', color: !backgroundColor ? '#0D1B3D' : 'black' }}>
                {mobileView ?
                    <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0.5rem' }}>

                        <IconButton onClick={handleDrawer} edge="start" className={classes.menuButton} color='primary' aria-label="menu">
                            <MenuIcon fontSize='inherit' />
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
                                    <Button onClick={() => link('apartments/forSell')}>
                                        <span style={{ color: '#5F5A46' }} >דירות למכירה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('apartments/forRent')}>
                                        <span style={{ color: '#5F5A46' }} >דירות להשכרה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('ourStory')}>
                                        <span style={{ color: '#5F5A46' }} >
                                            סיפורי ההצלחה</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('theGroup')}>
                                        <span style={{ color: '#5F5A46' }}  >הצוות המנצח</span>
                                    </Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('blog')}> <span style={{ color: '#5F5A46' }} >בלוג</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Button onClick={() => link('contactUs')}> <span style={{ color: '#5F5A46' }} >צור קשר</span></Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <div style={{ padding: '2rem 2rem 0', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row' }}>
                                        <IconButton style={{ padding: 0 }} href={contact.facebook}>
                                            <FacebookIcon fontSize='large' style={{ color: 'blue' }} />
                                        </IconButton>
                                        <IconButton style={{ padding: 0 }}
                                            href={`https://api.whatsapp.com/send?phone=+972${contact.phone}&text=${contact.whatsApp}`}>
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

                        <IconButton href='tel:+972509677226'><PhoneIcon color='primary' fontSize='inherit' /></IconButton>
                    </Toolbar>
                    : <Toolbar style={{ display: 'flex', flexDirection: 'row', textAlign: 'right', justifyContent: 'space-between', padding: '1rem' }}>
                        <div onClick={() => link('')} style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '20px 20px' }}>
                            <img height='55px' width='auto' src={contact.logo.url} style={{ flex: 1, borderRadius: '20px 20px' }} />
                        </div>
                        <div style={{ textAlign: 'right', flex: 8, paddingRight: '1rem' }} >
                            <Button onClick={() => link('apartments/forSell')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }} >דירות למכירה</span>
                            </Button>
                            <Button onClick={() => link('apartments/forRent')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >דירות להשכרה</span>
                            </Button>
                            <Button onClick={() => link('ourStory')}> <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >סיפורי ההצלחה</span></Button>
                            <Button onClick={() => link('theGroup')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >הצוות המנצח</span>
                            </Button>
                            <Button onClick={() => link('blog')}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }} >בלוג</span>
                            </Button>
                            <Button onClick={() => link('contactUs')}> <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }}  >צור קשר</span></Button>
                        </div>
                        <Button href={`tel:+972${contact.phone}`} style={{ flex: 1 }}
                            style={{ color: '#5F5A46' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'black' }} >{contact.phone}</span>

                            <IconButton ><PhoneIcon style={{ color: 'blue' }} fontSize='inherit' /></IconButton></Button>

                    </Toolbar>
                }

            </AppBar>
        </div>
    );
}
