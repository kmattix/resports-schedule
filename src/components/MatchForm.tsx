import React, { useState }  from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';

import { Card, CardContent, Divider, Grid, InputAdornment, MenuItem, TextField, Typography } 
    from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { addMatch, modifyMatch, removeMatch } from '../utils/firebase-service';

import { MatchProps } from './Match';
import { defaultTwitch, matchTimes } from './global/Settings';

const validationSchema = yup.object({
    title: yup.string()
        .required('Match title is required')
        .max(25, 'Title may be too long'),
    home: yup.string()
        .required('Home team name is required')
        .max(25, 'Name may be too long'),
    away: yup.string()
        .max(25, 'Name may be too long'),
    matchTime: yup.number()
        .required(),
    twitch: yup.string()
        .min(4, 'Twitch usernames must be at least 4 characters')
        .max(25, 'Twitch usernames cannot be more than 25 characters ')
        .required('Twitch username is required'),
    game: yup.string()
});

type MatchFormProps = {
    modify?: MatchProps,
    modalClose?: () => void,
    minWidth?: string,
    maxWidth?: string
}

export default function MatchForm(props: MatchFormProps) {
    const [submitting, setSubmitting] = useState(false);
    const [matchTimeVal, setMatchTimeVal] = useState<Dayjs | null>(
        props.modify ? dayjs.unix(props.modify.matchTime) : 
        //rounds the clock up to the nearest hour
        dayjs().hour(dayjs().hour() + 1)
        .subtract(dayjs().minute(), 'minutes')
        .subtract(dayjs().second(), 'seconds')
        .subtract(dayjs().millisecond(), 'milliseconds'));

    const handleMatchTimeChange = (newValue: Dayjs | null) => {
        setMatchTimeVal(newValue);
        if(newValue !== null) formik.values.matchTime = newValue.unix();
    }

    const resetForm = () => {
        formik.resetForm();
        setMatchTimeVal(dayjs());
        setSubmitting(false);
        props.modalClose && props.modalClose();
    }

    const formik = useFormik({
        initialValues: {
            title: props.modify ? props.modify.title : '',
            home: props.modify ? props.modify.home : '',
            away: props.modify ? props.modify.away : '',
            matchTime: matchTimeVal ? matchTimeVal.unix() : dayjs().unix(),
            twitch: props.modify ? props.modify.twitch : defaultTwitch,
            game: props.modify ? props.modify.game : 'other'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            const match: MatchProps = {
                title: values.title,
                home: values.home,
                away: values.away,
                matchTime: values.matchTime,
                twitch: values.twitch,
                game: values.game
            }

            props.modify && props.modify.id ? 
            modifyMatch(props.modify.id, match).then(() => {
                resetForm()
            }, () => setSubmitting(false)) :
            addMatch(match)
            .then(() => {
                resetForm();
            }, () => setSubmitting(false));
        },
    });

    const handleDelete = () => {
        setSubmitting(true);
        
        props.modify && props.modify.id && 
        removeMatch(props.modify.id).then(() => {
            resetForm();
        }, () => setSubmitting(false));
    }

    return (
        <Card >
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid 
                    container 
                    rowSpacing={2} 
                    columnSpacing={1} 
                    minWidth={props.minWidth} 
                    maxWidth={props.maxWidth}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}>
                                {props.modify ? 'Modify' : 'Add'} Match 
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='title'
                                name='title'
                                label='Match Title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && 
                                    Boolean(formik.errors.title)}
                                helperText={formik.touched.title && 
                                    formik.errors.title}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id='home'
                                name='home'
                                label='Home'
                                value={formik.values.home}
                                onChange={formik.handleChange}
                                error={formik.touched.home && 
                                    Boolean(formik.errors.home)}
                                helperText={formik.touched.home && 
                                    formik.errors.home}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id='away'
                                name='away'
                                label='Away (optional)'
                                value={formik.values.away}
                                onChange={formik.handleChange}
                                error={formik.touched.away && 
                                    Boolean(formik.errors.away)}
                                helperText={formik.touched.away && 
                                    formik.errors.away}/>
                        </Grid>
                        <Grid item xs={12}> 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                    label='Match Time'
                                    minDateTime={props.modify && 
                                        props.modify.matchTime < dayjs().unix() ? 
                                        matchTimes.minModifyPassed : 
                                        matchTimes.min}
                                    maxDateTime={matchTimes.max}
                                    ampm={false}
                                    renderInput={(props: any) => 
                                        <TextField 
                                            fullWidth
                                            id='matchTime' 
                                            name='matchTime'
                                            onChange={formik.handleChange}
                                            error={formik.touched.matchTime && 
                                                Boolean(formik.errors.matchTime)}
                                            {...props}/>}
                                    value={matchTimeVal}
                                    onChange={(value) => {
                                        handleMatchTimeChange(value);
                                    }}/>
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='twitch'
                                name='twitch'
                                label='Twitch Account'
                                value={formik.values.twitch}
                                onChange={formik.handleChange}
                                error={formik.touched.twitch && Boolean(formik.errors.twitch)}
                                helperText={formik.touched.twitch && formik.errors.twitch}
                                InputProps={{
                                    startAdornment: 
                                    <InputAdornment position='start'>
                                        twitch.tv/
                                    </InputAdornment>
                                }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                id='game'
                                name='game'
                                label='Game'
                                value={formik.values.game}
                                onChange={formik.handleChange}
                                error={formik.touched.game && Boolean(formik.errors.game)}
                                helperText={formik.touched.game && formik.errors.game}>
                                <MenuItem value="rocketleague">Rocket League</MenuItem>
                                <MenuItem value="valorant">Valorant</MenuItem>
                                <MenuItem value="leagueoflegends">League of Legends</MenuItem>
                                <MenuItem value="smashultimate">Smash Ultimate</MenuItem>
                                <MenuItem value="fifa">FIFA</MenuItem>
                                <MenuItem value="nba2k">NBA2k</MenuItem>
                                <MenuItem value="overwatch">Overwatch</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton 
                            loading={submitting} 
                            fullWidth 
                            variant='contained'
                            color='success' 
                            type='submit'>
                                Submit
                            </LoadingButton>
                        </Grid>
                        {props.modify && <>
                        <Grid item xs={6}>
                            <LoadingButton 
                            loading={submitting} 
                            fullWidth 
                            variant='contained' 
                            onClick={props.modalClose}>
                                Cancel
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton 
                            loading={submitting} 
                            fullWidth 
                            variant='contained' 
                            color='error' 
                            onClick={handleDelete}>
                                Delete
                            </LoadingButton>
                        </Grid></>}
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}