import { Box, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Match, { MatchProps } from './Match';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { querySchedule } from '../utils/firebaseService';
import { DocumentData } from 'firebase/firestore';
import { formatSchedule } from '../utils/schedule';
import { useNavigate } from 'react-router-dom';
import resportslogo from '../assets/logo4231.png';

export default function Schedule() {
    
    const [documents, loading] = useCollectionData(querySchedule());

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
        {
            loading ? <CircularProgress/> :

            <Grid container rowSpacing={2} paddingTop={1} sx={{ maxWidth: '40rem' }}>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='top'>
                    <IconButton size='large' onClick={() => {navigate('/admin')}}>
                        <Box
                        component={'img'}
                        sx={{
                            maxWidth: 250
                        }}
                        alt={'Radford Esports'}
                        src={resportslogo}/>
                    </IconButton>
                </Grid>

                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                {             
                    schedule.length ? 

                    schedule.map((match: MatchProps) => {
                        return(
                            <Grid item key={match.matchTime.toString()} xs={12}>
                                <Match {... match}></Match>
                            </Grid>
                        );
                    }) :

                    <Grid item xs={12}>
                        <Typography variant='h4' color='text.disabled' display='flex' justifyContent='center' margin={'5vh'}>
                            No upcoming matches...
                        </Typography>
                    </Grid>
                }
            </Grid>
        }
    </Box>);
}