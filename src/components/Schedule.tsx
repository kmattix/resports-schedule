import { Box, Button, CircularProgress, Divider, Grid, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Match, { MatchProps } from './Match';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, querySchedule } from '../utils/firebaseService';
import { DocumentData } from 'firebase/firestore';
import { formatSchedule } from '../utils/schedule';
import { useNavigate } from 'react-router-dom';
import resportslogo from '../assets/logo4231.png';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Schedule() {
    
    const [documents, loading] = useCollectionData(querySchedule());
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [schedule, setSchedule] = useState<MatchProps[]>([]);

    useEffect(() => {
        let newSchedule: MatchProps[] = [];
        documents && documents.forEach((doc: DocumentData) => {
            newSchedule.push({
                    title: doc.title,
                    home: doc.home,
                    away: doc.away,
                    matchTime: doc.matchTime,
                    twitch: doc.twitch,
                    game: doc.game
                });
            });
        setSchedule(formatSchedule(newSchedule));
    }, [documents]);

  return (
    <Box
        display='flex'
        justifyContent='center'
        alignItems='top'>
        <Grid container rowSpacing={1} sx={{ maxWidth: '40rem' }}>
            <Grid item xs={12} display='flex' justifyContent='center'>
                <Tooltip title= {user ? 'Admin controls' : 'Admin login'}>
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
            <Grid container item rowSpacing={2} display='flex' justifyContent='center' xs={12}>
                {
                    loading ? <CircularProgress sx={{ marginTop: '20vh' }}/> :  

                    schedule.length ? 
    
                    schedule.map((match: MatchProps) => {
                        return(
                            <Grid item key={match.matchTime.toString()} xs={12}>
                                <Match {... match}></Match>
                            </Grid>
                        );
                    }) :
    
                    <Grid item xs={12}>
                        <Typography variant='h4' color='text.disabled' align='center'>
                            No upcoming matches...
                        </Typography>
                    </Grid>
                }
            </Grid>
        </Grid>
    </Box>);
}