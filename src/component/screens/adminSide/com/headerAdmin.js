import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import firebase from '../../../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const HeaderAdmin = () => {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [apartmentWidth, setApartmentWidth] = useState()
    const SellRef = useRef(null);
    const RentRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleNavigate = (e, path) => {
        history.push('/login/' + path)
    }
    const handleClose = (event, path) => {
        console.log(path)
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);

    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    useEffect(() => {
        if (firebase.auth().currentUser) {
            console.log(true)
        } else {
            history.push('/login')
        }
    }, [firebase])
    useEffect(() => {
        setApartmentWidth(document.getElementById('apartments').offsetWidth)
    }, [])

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const classes = useStyles();
    const history = useHistory()

    // const uploadImage = () => {
    //     history.push('/login/uploadImage');
    // }
    const home = () => {
        history.push('/login/home');
    }
    const uploadRecommended = () => {
        history.push('/login/recommended');
    }
    const checkMessage = () => {
        history.push('/login/checkMessage')
    }
    const uploadBlog = () => {
        history.push('/login/articles')
    }
    const handleGroup = () => {
        history.push('/login/group');
    }
    const handleFeatures = () => {
        history.push('/login/features')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar style={{ textAlign: 'center' }}>
                    <Button onClick={home} style={{ flex: 1 }} >
                        <Typography variant="h6" className={classes.title}>
                            בית
                    </Typography>
                    </Button>
                    <div style={{ flex: 1 }} id='apartments'>
                        <Button
                            style={{ width: '100%' }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <Typography variant="h6" className={classes.title}>
                                נכסים
                        </Typography>
                        </Button>
                        <Popper style={{ position: 'relative', zIndex: 10, width: `${apartmentWidth}px` }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={(e) => handleNavigate(e, 'apartmentsSell')}>נכסים למכירה</MenuItem>
                                                <MenuItem onClick={(e) => handleNavigate(e, 'apartmentsRent')}>נכסים להשכרה</MenuItem>

                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                    <Button onClick={handleGroup} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            הצוות
                    </Typography>
                    </Button>

                    <Button onClick={uploadRecommended} style={{ flex: 1 }} >
                        <Typography variant="h6" className={classes.title}>
                            המלצות
                    </Typography>
                    </Button>
                    <Button onClick={checkMessage} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            הודעות
                    </Typography>
                    </Button>
                    <Button onClick={(e) => handleNavigate(e, 'ourArticles')} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            כתבות
                    </Typography>
                    </Button>
                    <Button onClick={uploadBlog} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            מאמרים
                    </Typography>
                    </Button>
                    <Button onClick={handleFeatures} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            תכונות
                    </Typography>
                    </Button>
                    <Button onClick={() => { firebase.auth().signOut().then(() => history.push('/login')).catch(err => console.log(err)) }} style={{ backgroundColor: '#D23830', color: 'white', borderRadius: '50%', flex: 0.5 }}>
                        <Typography variant="h6" className={classes.title} >
                            התנתק
                    </Typography>
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderAdmin;

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         zIndex: 1000
//     },
//     paper: {
//         marginRight: theme.spacing(2),
//         zIndex: 100
//     },
// }));

// export default function MenuListComposition() {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const anchorRef = React.useRef(null);

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event) => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//             return;
//         }

//         setOpen(false);
//     };

//     function handleListKeyDown(event) {
//         if (event.key === 'Tab') {
//             event.preventDefault();
//             setOpen(false);
//         }
//     }

//     // return focus to the button when we transitioned from !open -> open
//     const prevOpen = React.useRef(open);
//     React.useEffect(() => {
//         if (prevOpen.current === true && open === false) {
//             anchorRef.current.focus();
//         }

//         prevOpen.current = open;
//     }, [open]);

//     return (
//         <div className={classes.root}>
//             {/* <Paper className={classes.paper}>
//                 <MenuList>
//                     <MenuItem>Profile</MenuItem>
//                     <MenuItem>My account</MenuItem>
//                     <MenuItem>Logout</MenuItem>
//                 </MenuList>
//             </Paper> */}
//             <div>
//                 <Button
//                     ref={anchorRef}
//                     aria-controls={open ? 'menu-list-grow' : undefined}
//                     aria-haspopup="true"
//                     onClick={handleToggle}
//                 >
//                     Toggle Menu Grow
//         </Button>
//                 <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//                     {({ TransitionProps, placement }) => (
//                         <Grow
//                             {...TransitionProps}
//                             style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                         >
//                             <Paper>
//                                 <ClickAwayListener onClickAway={handleClose}>
//                                     <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
//                                         <MenuItem onClick={handleClose}>Profile</MenuItem>
//                                         <MenuItem onClick={handleClose}>My account</MenuItem>
//                                         <MenuItem onClick={handleClose}>Logout</MenuItem>
//                                     </MenuList>
//                                 </ClickAwayListener>
//                             </Paper>
//                         </Grow>
//                     )}
//                 </Popper>
//             </div>
//         </div >
//     );
// }
