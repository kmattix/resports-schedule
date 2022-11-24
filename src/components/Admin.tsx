import { Box, Card, CardContent, Divider, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import resportsLogo from '../assets/logo192.png';
import { addMatch } from '../utils/firebaseService';

const validationSchema = yup.object({
    title: yup.string()
        .required('Match title is required'),
    home: yup.string()
        .required('Home team name is required'),
    away: yup.string(),
    matchTime: yup.number()
        .required('Match time is required'),
    twitch: yup.string()
        .min(4, 'Twitch usernames must be at least 4 characters')
        .max(25, 'Twitch usernames cannot be more than 25 characters ')
        .required('Twitch username is required'),
    game: yup.string()
})

export default function Admin() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            home: '',
            away: '',
            matchTime: Date.now(),
            twitch: '',
            game: 'other'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSubmitting(true);
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
                setSubmitting(false);
            }, () => setSubmitting(false));
        }
    });

  return (<>
        <IconButton onClick={() => navigate('/')}>
            <Box
            component={'img'}
            sx={{
                maxHeight: 50,
                maxWidth: 50,
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: '2px',
            }}
            alt={'Schedule'}
            src={resportsLogo}
            />
        </IconButton>
        <Box
            display='flex'
            justifyContent='center'
            alignItems='top'>
            <Card>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container rowSpacing={2} columnSpacing={1} maxWidth={'50vw'}>
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
                                <TextField
                                    fullWidth
                                    id='matchTime'
                                    name='matchTime'
                                    label='Match Time Placeholder'
                                    value={formik.values.matchTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.matchTime && Boolean(formik.errors.matchTime)}
                                    helperText={formik.touched.matchTime && formik.errors.matchTime}/>
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
                                    <MenuItem value="fifa">NBA2k</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                <LoadingButton loading={submitting} fullWidth variant='contained' color='success' type='submit'>Submit</LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    </>);
}