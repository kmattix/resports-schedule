import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { auth } from '../utils/firebaseService';
import Admin from './Admin';

const validationSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Not a valid email'),
    password: yup.string()
        .required('Password is required')
});

export default function SignIn() {
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [user] = useAuthState(auth);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSubmitting(true);
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                setSubmitting(false);
                setErrorMessage(false);
                navigate('/admin');
            })
            .catch((error) => {
                setSubmitting(false);
                setErrorMessage(true);
            })
        }
    });

    return (<>
        {!user ? 
        <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'>
        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container rowSpacing={2} columnSpacing={1} maxWidth={'20vw'}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}>Admin Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='email'
                                name='email'
                                label='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant='outlined'>
                                <InputLabel htmlFor='password' error={formik.touched.password && Boolean(formik.errors.password)}>Password</InputLabel>
                                <OutlinedInput
                                    id='password'
                                    name='password'
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                <FormHelperText error={formik.touched.password && Boolean(formik.errors.password)}>
                                    {formik.touched.password && formik.errors.password}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            <Typography color='error' sx={{ visibility: errorMessage ? 'visible' : 'hidden' }}>Email or password is incorrect</Typography>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            <LoadingButton loading={submitting} fullWidth variant='contained' color='success' type='submit'>Sign In</LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Box> :
    navigate('/admin')}
    </>);
}