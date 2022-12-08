import dayjs from "dayjs";

import rocketleagueIcon from '../../assets/rocketleague.png';
import valorantIcon from '../../assets/valorant.png';
import leagueoflegendsIcon from '../../assets/leagueoflegends.png';
import smashultimateIcon from '../../assets/smashultimate.png';
import fifaIcon from '../../assets/fifa.png';
import nba2kIcon from '../../assets/nba2k.png';
import overwatchIcon from '../../assets/overwatch.png';

//seconds
export const refreshDelay = 10;

//ms
export const toolTipDelays = {
    enter: 500,
    enterNext: 2000
}

export const matchTimes = {
    min: dayjs().subtract(1, 'day'),
    minModifyPassed: dayjs().subtract(1, 'day'),
    max: dayjs().add(1, 'year')
}

export const defaultTwitch = 'RadfordEsports';

export const games = {
    rocketleague: {
        image: rocketleagueIcon,
        name: 'Rocket League'
    },
    valorant: {
        image: valorantIcon,
        name: 'Valorant'
    },
    leagueoflegends: {
        image: leagueoflegendsIcon,
        name: 'League of Legends'
    },
    smashultimate: {
        image: smashultimateIcon,
        name: 'Smash Ultimate'
    },
    fifa: {
        image: fifaIcon,
        name: 'FIFA'
    },
    nba2k: {
        image: nba2kIcon,
        name: 'NBA2k'
    },
    overwatch: {
        image: overwatchIcon,
        name: 'Overwatch'
    },
    other: {
        image: '',
        name: 'Other'
    }
}