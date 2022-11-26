import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { CalendarMonth, Logout } from '@mui/icons-material';
import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import resportsLogo from '../assets/logo192.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseService';
import { signOut } from 'firebase/auth';
import MatchForm from './MatchForm';


export default function Admin() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((e) => {
            handleClose();
        })
    }
    
    return(<>
        {user ? <>
            <IconButton onClick={handleClick}>
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
            
            <Menu 
                id='admin-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}>
                    <MenuItem onClick={() => navigate('/')}>
                        <ListItemIcon >
                            <CalendarMonth fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText>Schedule</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>
                        <ListItemIcon >
                            <Logout  fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
            </Menu>
            <Box
            display='flex'
            justifyContent='center'
            alignItems='top'>
                <MatchForm maxWidth='40rem'/>
            </Box>
        </> :
        navigate('/sign-in')}
    </>);
}