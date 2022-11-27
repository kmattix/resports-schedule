import { Box, Button, Card, CardContent, Grid, IconButton, Modal, SvgIcon, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import GameIcon from './GameIcon';
import { formatMatchDate }  from '../utils/formatDate';
import { ReactComponent as TwitchIcon} from '../assets/twitch_logo.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseService';
import { MoreHoriz } from '@mui/icons-material';
import MatchForm from './MatchForm';
import dayjs from 'dayjs';

export type MatchProps = {
    id?: string,
    title: string,
    home: string,
    away?: string,
    twitch: string,
    matchTime: number,
    game: string
}

export default function Match(props: MatchProps) {
    const [user] = useAuthState(auth);

    const [matchTime, setMatchTime] = useState(formatMatchDate(props.matchTime));
    const [showContext, setShowContext] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleHover = (hover: boolean) => {
        user && setShowContext(hover)
    }

    const handleModalOpen = () => {
      setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    //updates the timers every minute or when the fire store hook fires off from props
    useEffect(() => {
        setMatchTime(formatMatchDate(props.matchTime))
        const interval = setInterval(() => {
            setMatchTime(formatMatchDate(props.matchTime))
        }, 60000);

        return () => clearInterval(interval);
    }, [props.matchTime]);

    return (<>
            <Card onMouseOver={() => handleHover(true)} onMouseOut={() => handleHover(false)}>
                <CardContent>
                    <Grid container>
                        {showContext && <>
                            <Grid item xs={6}>                                
                                <Typography variant='body2' color='text.disabled'>
                                    {props.id}
                                </Typography>
                            </Grid>
                            <Grid item display='flex' justifyContent='flex-end' xs={6}>
                                <Tooltip title='Modify match' placement='left' enterDelay={500} enterNextDelay={2000} arrow>
                                    <IconButton size='small' onClick={handleModalOpen}>
                                        <MoreHoriz color='disabled' fontSize='small'></MoreHoriz>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </>}
                        <Grid item xs={10}>
                            <Grid container paddingRight={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h4' color={'text.secondary'} noWrap>
                                        {props.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' noWrap>
                                        {props.home}{props.away ? ` vs ${props.away}` : ''}
                                    </Typography>  
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>
                                        {matchTime}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} marginTop={1}>
                                    <Button 
                                        variant='contained' 
                                        href={`https://twitch.tv/${props.twitch}`}
                                        sx={{ textTransform:'none', maxWidth: '95%', '&:hover': { backgroundColor: '#9146FF' }}} 
                                        startIcon={
                                            <SvgIcon sx={{ fontSize: '24px' }}>
                                                <TwitchIcon/>
                                            </SvgIcon>}>{`/ ${props.twitch}`
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item paddingRight={2} xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <GameIcon game={props.game}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center' sx={{ minHeight: '100vh' }}>
                    <MatchForm modify={props} modalClose={handleModalClose} maxWidth='40rem'/>
                </Box>
            </Modal>
            </>);
}