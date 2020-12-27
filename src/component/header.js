import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIcon from '@material-ui/icons/Phone';
import logo from '../assets/loggo.png';
import { useHistory } from 'react-router-dom';
import { Divider, List } from '@material-ui/core';

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

export default function ButtonAppBar() {

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
            <AppBar position="static" style={{ padding: '1rem', backgroundColor: '#9DA1A3', color: '#0D1B3D' }}>
                {mobileView ? <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>

                    <IconButton onClick={handleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Drawer
                        {...{
                            anchor: "right",
                            open: drawer,
                            onClose: handleDrawer,
                        }}
                    >
                        <List style={{ textAlign: 'right', padding: '1rem 1rem 2rem 3rem' }}>
                            <Button onClick={() => link('apartmentSell')}>
                                <span style={{ fontSize: '1.5rem', color: '#5F5A46' }} >דירות למכירה</span></Button>
                            <Divider />
                            <Button onClick={() => link('apartmentRent')}>
                                <span style={{ fontSize: '1.5rem', color: '#5F5A46' }} >דירות להשכרה</span></Button>
                            <Divider />
                            <Button onClick={() => link('ourStory')}> <span style={{ fontSize: '1.5rem', color: '#5F5A46' }} >סיפור ההצלחה</span></Button>
                            <Divider />
                            <Button onClick={() => link('contactUs')}> <span style={{ fontSize: '1.5rem', color: '#5F5A46' }} >צור קשר</span></Button>

                        </List>
                        <div></div>
                    </Drawer>
                    <div onClick={() => link('')} style={{ cursor: 'pointer' }}>
                        <img height='auto' width='200em' src={logo} style={{ flex: 1 }} />
                    </div>

                    <IconButton href='tel:+972509677226'><PhoneIcon color='primary' fontSize='large' /></IconButton>
                </Toolbar>
                    : <Toolbar style={{ display: 'flex', flexDirection: 'row', textAlign: 'right', justifyContent: 'space-between' }}>
                        <div onClick={() => link('')} style={{ cursor: 'pointer' }}><img height='auto' width='200em' src={logo} style={{ flex: 1 }} />
                        </div>
                        <div style={{ textAlign: 'right', flex: 8, paddingRight: '1rem' }} >
                            <Button onClick={() => link('apartmentSell')}><Typography variant="h5" style={{ color: '#5F5A46' }} >דירות למכירה</Typography></Button>
                            <Button onClick={() => link('apartmentRent')}><Typography variant="h5" style={{ color: '#5F5A46' }}>דירות להשכרה</Typography></Button>
                            <Button onClick={() => link('ourStory')}><Typography variant="h5" style={{ color: '#5F5A46' }}>סיפור ההצלחה</Typography></Button>
                            <Button onClick={() => link('contactUs')}><Typography variant="h5" style={{ color: '#5F5A46' }}>צור קשר</Typography></Button>
                        </div>
                        <Button href='tel:+972509677226' style={{ flex: 1 }}
                            style={{ color: '#5F5A46' }}>
                            <span style={{ fontSize: '1.5rem' }} onClick={handleCall}>054-51064685</span>

                            <IconButton ><PhoneIcon color='primary' /></IconButton></Button>

                    </Toolbar>
                }

            </AppBar>
        </div>
    );
}
