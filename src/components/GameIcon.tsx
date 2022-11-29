import React from 'react'

import { Box } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import { MatchProps } from './Match';

import rocketleagueIcon from '../assets/rocketleague.png';
import valorantIcon from '../assets/valorant.png';
import leagueoflegendsIcon from '../assets/leagueoflegends.png'
import smashultimateIcon from '../assets/smashultimate.png';
import fifaIcon from '../assets/fifa.png';
import nba2kIcon from '../assets/nba2k.png';

type GameIconProps = {
    game: MatchProps['game']
}

export default function GameIcon({ game }: GameIconProps) {
    let image: string;
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
        case 'smashultimate':
            image = smashultimateIcon;
            break;
        case 'fifa':
            image = fifaIcon;
            break;
        case 'nba2k':
            image = nba2kIcon;
            break;
        default:
            image = 'other';
    }

    return ((image === 'other') ? 
    <VideogameAssetIcon sx={{ fontSize: '110px', color: '#FFFFFF'}}/> : 
    <Box
        component={'img'}
        sx={{
            maxHeight: 100,
            maxWidth: 100
        }}
        alt={game}
        src={image}
    />);
}