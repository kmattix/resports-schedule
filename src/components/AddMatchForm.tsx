import { Card, CardContent, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState }  from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addMatch } from '../utils/firebaseService';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

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

export default function AddMatchForm() {
    const [submitting, setSubmitting] = useState(false);

    const [matchTimeVal, setMatchTimeVal] = useState<Dayjs | null>(dayjs(),);
    const handleMatchTimeChange = (newValue: Dayjs | null) => {
        setMatchTimeVal(newValue);
        if(newValue !== null) formik.values.matchTime = newValue.unix();
      };

    const formik = useFormik({
        initialValues: {
            title: '',
            home: '',
            away: '',
            matchTime: dayjs().unix(),
            twitch: '',
            game: 'other'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            console.log(matchTimeVal?.format())

            addMatch({
                title: values.title,
                home: values.home,
                away: values.away,
                matchTime: values.matchTime,
                twitch: values.twitch,
                game: values.game
            })
            .then(() => {
                formik.resetForm();
                setMatchTimeVal(dayjs())
                setSubmitting(false);
            }, () => setSubmitting(false));
        }
    });

    return (
        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container rowSpacing={2} columnSpacing={1} minWidth={'450px'} maxWidth={'50vw'}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}>Add Match</Typography>
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
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id='home'
                                name='home'
                                label='Home'
                                value={formik.values.home}
                                onChange={formik.handleChange}
                                error={formik.touched.home && Boolean(formik.errors.home)}
                                helperText={formik.touched.home && formik.errors.home}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id='away'
                                name='away'
                                label='Away (optional)'
                                value={formik.values.away}
                                onChange={formik.handleChange}
                                error={formik.touched.away && Boolean(formik.errors.away)}
                                helperText={formik.touched.away && formik.errors.away}/>
                        </Grid>
                        <Grid item xs={12}> 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                    label='Match Time'
                                    minDateTime={dayjs().subtract(1, 'hour')}
                                    maxDateTime={dayjs().add(1, 'year')}
                                    ampm={false}
                                    renderInput={(props: any) => 
                                        <TextField 
                                            fullWidth 
                                            id='matchTime' 
                                            name='matchTime'
                                            onChange={formik.handleChange}
                                            error={formik.touched.matchTime && Boolean(formik.errors.matchTime)}
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
                                helperText={formik.touched.twitch && formik.errors.twitch}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='game'
                                select
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
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            <LoadingButton loading={submitting} fullWidth variant='contained' color='success' type='submit'>Submit</LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>);
}