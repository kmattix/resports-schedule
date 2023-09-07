import React, { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Box, CircularProgress } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

import { getGameIconUrl, getGameRef } from '../utils/firebase-service';

type GameIconProps = {
    game: string,
    size?: number
}

const defaultSize = 100;

function OtherIcon(props: GameIconProps) {
    return (
        <VideogameAssetIcon sx={{
            fontSize: props.size || defaultSize,
            color: '#FFFFFF'
        }} />
    );
}

export default function GameIcon(props: GameIconProps) {
    const [game, loading, error] = useDocumentData(getGameRef(props.game));
    const [url, setUrl] = useState('');


    useEffect(() => {
        getGameIconUrl(props.game).then(result => {
            setUrl(result);
        })
    }, [props.game])
    

    return (<>
        {props.game === 'other' ?
            <OtherIcon {...props} /> :
            loading ? <CircularProgress /> :
                game ? <Box
                    component={'img'}
                    sx={{
                        maxHeight: props.size || defaultSize,
                        maxWidth: props.size || defaultSize
                    }}
                    alt={props.game}
                    src={url}
                /> :
                    error && <OtherIcon {...props} />}
    </>);
}