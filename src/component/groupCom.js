import React from 'react';

import { Grid } from '@material-ui/core';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const GroupCom = () => {

    useFirebaseConnect([
        'group',
        'manager',
        'collaboration'
    ])

    const group = useSelector(state => state.firebase.ordered.group)
    const manager = useSelector(state => state.firebase.data.manager)
    const collaboration = useSelector(state => state.firebase.ordered.collaboration)

    if (!isLoaded(manager) || !isLoaded(group) || !isLoaded(collaboration)) {
        return <CircularProgress />
    }

    return (
        < div style={{ backgroundImage: `linear-gradient(120deg,white,#81B3B3,white)` }}>
            <Grid container spacing={4} style={{
                margin: 0, width: '100%', padding: '2rem', marginTop: '2rem'
            }}>
                {!isLoaded(manager) ? <CircularProgress />
                    : !isEmpty(manager) && <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className='group-com-roi'  >
                        <img src={manager.img.url} className='image-group-com' />
                        <br />
                        <span className='header-img-home-group'>
                            {manager.name}
                        </span>
                        <br />
                        <span className='sub-header-img-home-group'>
                            {manager.role}
                        </span>
                    </Grid>
                }
                {!isLoaded(group) ? <CircularProgress /> :
                    !isEmpty(manager) && group.map((p, i) => {
                        if (p.value) {
                            return <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <img src={p.value.img.url} className='image-group-com' />
                                <br />
                                <span className='header-img-home-group'>
                                    {p.value.name}
                                </span>
                                <br />
                                <span className='sub-header-img-home-group'>
                                    {p.value.role}</span>
                            </Grid>
                        }
                    })
                }
            </Grid>
            {!isEmpty(collaboration) &&
                <div style={{ textAlign: 'center' }}>
                    <h5>one-stop-shop</h5>

                    <h5>עובדים בשיתוף פעולה</h5>
                    <Grid container spacing={4} style={{
                        margin: 0, width: '100%', padding: '2rem'
                    }}>
                        {collaboration.map((col, i) => {
                            if (col.value) {
                                return <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <img src={col.value.img.url} className='image-group-com' />
                                    <br />
                                    <span className='header-img-home-group'>
                                        {col.value.name}
                                    </span>
                                    <br />
                                    <span className='sub-header-img-home-group'>
                                        {col.value.role}</span>
                                </Grid>

                            }
                        })
                        }
                    </Grid>
                </div>
            }
        </div>
    )
}
export default GroupCom;
