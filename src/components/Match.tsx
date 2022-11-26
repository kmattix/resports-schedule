import { Button, Card, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import React from 'react'
import GameIcon from './GameIcon';
import { formatMatchDate }  from '../utils/formatDate';
import { ReactComponent as TwitchIcon} from '../assets/twitch_logo.svg';

export type MatchProps = {
    title: string,
    home: string,
    away?: string,
    twitch: string,
    matchTime: number,
    game: string
}

export default function Match(props: MatchProps) {

  return (
    <Card>
        <CardContent>
            <Grid container paddingRight={2}>
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
                                {formatMatchDate(props.matchTime)}
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
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GameIcon game={props.game}/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>);
}