import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Box, Button, Card, CardContent, Grid, IconButton, Modal, SvgIcon, Tooltip, Typography } 
    from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import { formatMatchDate }  from '../utils/schedule-utilities';
import { auth } from '../utils/firebase-service';

import MatchForm from './MatchForm';
import { toolTipDelays } from './global/Settings';

import GameIcon from './GameIcon';
import { ReactComponent as TwitchIcon} from '../assets/twitch_logo.svg';

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

    return (<>
            <Card 
            onMouseOver={() => handleHover(true)} 
            onMouseOut={() => handleHover(false)}>
                <CardContent>
                    <Grid container>
                        {showContext && <>
                            <Grid item xs={6}>                                
                                <Typography variant='body2' color='text.disabled'>
                                    {props.id}
                                </Typography>
                            </Grid>
                            <Grid item display='flex' justifyContent='flex-end' xs={6}>
                                <Tooltip 
                                title='Modify match' 
                                placement='left' 
                                enterDelay={toolTipDelays.enter} 
                                enterNextDelay={toolTipDelays.enterNext} 
                                arrow>
                                    <IconButton size='small' onClick={handleModalOpen}>
                                        <MoreHoriz color='disabled' fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </>}
                        <Grid item xs={10}>
                            <Grid container paddingRight={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h5' color={'text.secondary'} noWrap>
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
                                        {formatMatchDate(props.matchTime)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} marginTop={1}>
                                    <Button 
                                        variant='contained' 
                                        href={`https://twitch.tv/${props.twitch}`}
                                        sx={{ 
                                            textTransform:'none', 
                                            maxWidth: '95%', 
                                            '&:hover': { backgroundColor: '#9146FF' }}}
                                        startIcon={
                                            <SvgIcon sx={{ fontSize: '24px' }}>
                                                <TwitchIcon/>
                                            </SvgIcon>}>{`/ ${props.twitch}`
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid 
                        item 
                        paddingRight={2} 
                        xs={2} 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
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