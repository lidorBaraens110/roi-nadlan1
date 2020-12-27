import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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

const HeaderLogin = () => {

    const classes = useStyles();
    const history = useHistory()

    const uploadImage = () => {
        history.push('/login/uploadImage');
    }
    const home = () => {
        history.push('/login/home');
    }
    const uploadRecommended = () => {
        history.push('/login/recommended');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                    <Button onClick={home} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            ראשי
      </Typography>
                    </Button>
                    <Button onClick={uploadImage} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            העלה נכס
                    </Typography>
                    </Button>
                    <Button onClick={uploadRecommended} style={{ flex: 1 }}>
                        <Typography variant="h6" className={classes.title}>
                            העלה המלצה
                    </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderLogin;