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
import overwatchIcon from '../assets/overwatch.png';

type GameIconProps = {
    game: MatchProps['game'],
    size?: number
}

const defaultSize = 100;

export default function GameIcon(props: GameIconProps) {
    let image: string;
    switch(props.game){
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
        case 'overwatch':
            image = overwatchIcon;
            break;
        default:
            image = 'other';
    }

    return ((image === 'other') ? 
    <VideogameAssetIcon sx={{ fontSize: props.size || defaultSize, color: '#FFFFFF'}}/> : 
    <Box
        component={'img'}
        sx={{
            maxHeight: props.size || defaultSize,
            maxWidth: props.size || defaultSize
        }}
        alt={props.game}
        src={image}
    />);
}