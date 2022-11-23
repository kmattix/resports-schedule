import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Match, { MatchProps } from './Match';

type ScheduleProps = {
    schedule: Array<MatchProps>
}

export default function Schedule(props: ScheduleProps) {
    const [schedule, setSchedule] = useState(Array<MatchProps>);

    useEffect(() => {
        setSchedule(props.schedule);
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