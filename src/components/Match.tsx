import { Box, Button, Card, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import React from 'react'
import { formatMatchDate }  from '../utils/formatDate';
import { ReactComponent as TwitchIcon} from '../assets/twitch_logo.svg';
import rocketleagueIcon from '../assets/rocketleague.png';
import valorantIcon from '../assets/valorant.png';
import leagueoflegendsIcon from '../assets/leagueoflegends.png'

type GameIconProps = {
    game: string
}

function GameIcon({ game }: GameIconProps) {
    let image;
    switch(game){
        case 'rocketleague':
            image = rocketleagueIcon;
            break;
        case 'valorant':
            image = valorantIcon;
            break;
        case 'leagueoflegends':
            image = leagueoflegendsIcon;
            break;
        // case 'smashultimate':
        //     image = '';
        //     break;
        // case 'fifa':
        //     image = '';
        //     break;
        // case 'nba2k':
        //     image = '';
        //     break;
        default:
            image = '';
    }

    return ((image === '') ? 
    <VideogameAssetIcon sx={{ fontSize: '110px', color: '#FFFFFF', marginRight: '10px'}}/> : 
    <Box
        component={'img'}
        marginRight={'10px'}
        sx={{
            maxHeight: 100,
            maxWidth: 100
        }}
        alt={game}
        src={image}
    />);
}

export type MatchProps = {
    title: string,
    home: string,
    away: string,
    twitch: string,
    matchTime: Date,
    game: string
}

export default function Match(props: MatchProps) {
  return (
    <Card>
        <CardContent>
            <Grid container>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h4' color={'text.secondary'} noWrap sx={{ maxWidth: '14em' }}>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' noWrap sx={{ maxWidth: '24em' }} >
                                {props.home} vs {props.away}
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
                                sx={{'&:hover': { backgroundColor: '#9146FF' }}} 
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