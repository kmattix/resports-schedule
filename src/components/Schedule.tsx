import { Box, Grid } from '@mui/material';
import React from 'react';
import Match from './Match';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { querySchedule } from '../utils/firebaseService';
import { DocumentData } from 'firebase/firestore';

export default function Schedule() {
    
    const [documents, loading, error] = useCollectionData(querySchedule());

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="top">
        <Grid container rowSpacing={2} sx={{ maxWidth: '650px' }}>
            {documents && documents.map((doc: DocumentData) => {

                //TODO: Add sorting for the list (probably need to conver the types)
                return(
                    <Grid item key={doc.matchTime.toString()} xs={12}>
                        <Match {...
                            {title: doc.title, 
                            home: doc.home, 
                            away: doc.away, 
                            twitch: doc.twitch, 
                            matchTime: doc.matchTime, 
                            game: doc.game}}></Match>
                    </Grid>
                );
            })}
            
        </Grid>
    </Box>
  );
}