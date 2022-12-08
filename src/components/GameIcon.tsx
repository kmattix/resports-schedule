import React from 'react'

import { Box } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import { games } from './global/Settings';

type GameIconProps = {
    game: string,
    size?: number
}

export default function GameIcon(props: GameIconProps) {
    const defaultSize = 100;

    type GameKey = keyof typeof games;
    const game = props.game as GameKey;

    return (game === 'other' ? 
    <VideogameAssetIcon sx={{ fontSize: props.size || defaultSize, color: '#FFFFFF'}}/> : 
    <Box
        component={'img'}
        sx={{
            maxHeight: props.size || defaultSize,
            maxWidth: props.size || defaultSize
        }}
        alt={props.game}
        src={games[game].image}
    />);
}