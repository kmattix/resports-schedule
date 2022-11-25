import { Box, IconButton } from '@mui/material';
import React  from 'react';
import { useNavigate } from 'react-router-dom';
import resportsLogo from '../assets/logo192.png';
import AddMatchForm from './AddMatchForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseService';

export default function Admin() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    
    return(<>
        {user ? <>
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
                src={resportsLogo}/>
            </IconButton>
            <Box
            display='flex'
            justifyContent='center'
            alignItems='top'>
                <AddMatchForm/>
            </Box>
        </> :
        navigate('/sign-in')}
    </>);
}