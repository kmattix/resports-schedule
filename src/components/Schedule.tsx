import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatSchedule } from '../utils/schedule';
import Match, { MatchProps } from './Match';

export type ScheduleProps = {
    schedule: MatchProps[]
}

export default function Schedule(props: ScheduleProps) {
    const [schedule, setSchedule] = useState<MatchProps[]>([]);

    useEffect(() => {
        setSchedule(formatSchedule(props.schedule));
    }, [props.schedule]);

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="top">
        <Grid container rowSpacing={2} sx={{ maxWidth: '650px' }}>
            {schedule.map(match => {
                return(
                <Grid item key={match.matchTime.getTime().toString()} xs={12}>
                    <Match {...match}></Match>
                </Grid>);
            })}
        </Grid>
    </Box>
  );
}