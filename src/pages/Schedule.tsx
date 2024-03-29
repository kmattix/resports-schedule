import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';

import { Box, Button, CircularProgress, Divider, Grid, Tooltip, Typography } from '@mui/material';

import { auth, querySchedule, removeOldMatches } from '../utils/firebase-service';
import { formatSchedule } from '../utils/schedule-utilities';

import Match, { MatchProps } from '../components/Match';

import resportslogo from '../assets/logo4231.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { refreshDelay, toolTipDelays } from '../global/Settings';

export default function Schedule() {
    const [snapshot, loading] = useCollection(querySchedule());
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [schedule, setSchedule] = useState<MatchProps[]>([]);


    // updates the schedule every 10 seconds or 
    // when the firestore state fires off
    useEffect(() => {
        const updateSchedule = () => {
            let newSchedule: MatchProps[] = [];
    
            snapshot && snapshot.docs.forEach(
                (doc: QueryDocumentSnapshot) => {
                newSchedule.push({
                        id: doc.id,
                        title: doc.data().title,
                        home: doc.data().home,
                        away: doc.data().away,
                        matchTime: doc.data().matchTime,
                        twitch: doc.data().twitch,
                        game: doc.data().game
                    });
                });

                user && removeOldMatches(newSchedule);
    
            setSchedule(formatSchedule(newSchedule));
        }

        updateSchedule();
        const interval = setInterval(() => {
            updateSchedule();
        }, refreshDelay * 1000);

        return () => clearInterval(interval);
    }, [snapshot, user]);

    return (
        <Box
        display='flex'
        justifyContent='center'
        alignItems='top'>
            <Grid container rowSpacing={1} sx={{ maxWidth: '40rem' }}>
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <Tooltip 
                    title={user ? 'Admin page' : 'Admin login'} 
                    enterDelay={toolTipDelays.enter} 
                    enterNextDelay={toolTipDelays.enterNext} 
                    arrow>
                        <Button size='large' onClick={() => {navigate('/admin')}}>
                            <Box
                            component={'img'}
                            sx={{
                                maxWidth: 250
                            }}
                            alt={'Radford Esports'}
                            src={resportslogo}/>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} marginBottom={1}>
                    <Divider/>
                </Grid>
                <Grid 
                container
                display='flex'
                justifyContent='center' 
                item 
                rowSpacing={2}
                xs={12}>
                    {loading ? <CircularProgress sx={{ marginTop: '20vh' }}/> :  
                    schedule.length ? 
                    schedule.map((match: MatchProps) => {
                        return(
                            <Grid item key={match.id} xs={12}>
                                <Match {... match}></Match>
                            </Grid>
                        );
                    }) :
                    <Grid item xs={12}>
                        <Typography 
                        variant='h4' 
                        color='text.disabled' 
                        align='center'>
                            No upcoming matches...
                        </Typography>
                    </Grid>}
                </Grid>
            </Grid>
        </Box>
    );
}