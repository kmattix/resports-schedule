import { Box } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import React from 'react'
import rocketleagueIcon from '../assets/rocketleague.png';
import valorantIcon from '../assets/valorant.png';
import leagueoflegendsIcon from '../assets/leagueoflegends.png'
import smashultimateIcon from '../assets/smashultimate.png';
import fifaIcon from '../assets/fifa.png';
import nba2kIcon from '../assets/nba2k.png';

type GameIconProps = {
    game: string
}

export default function GameIcon({ game }: GameIconProps) {
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