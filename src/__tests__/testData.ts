import dayjs from "dayjs";

import { MatchProps } from "../components/Match";

export const input: MatchProps[] = [
    {
      title: 'Almost One Day Ago',
      home: 'Location',
      twitch: 'radfordesports',
      matchTime: dayjs().subtract(1, 'day').add(1, 'second').unix(),
      game: 'other'
    },
    {
      title: 'Started Almost An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'rocketleague ',
      matchTime: dayjs().subtract(1, 'hour').add(1, 'second').unix(),
      game: 'rocketleague'
    },
    {
      title: 'Started A Minute Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().subtract(1, 'minute').unix(),
      game: 'fifa'
    },
    {
      title: 'Starts In A Minute',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(1, 'minute').unix(),
      game: 'nba2k'
    },
    {
      title: 'Starts In An Hour',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(1, 'hour').unix(),
      game: 'smashultimate'
    },
    {
      title: 'Finished Over An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'CollegeVALORANT',
      matchTime: dayjs().subtract(1, 'hour').unix(),
      game: 'valorant'
    },
    {
      title: '6 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'nacestarleague',
      matchTime: dayjs().add(6, 'days').unix(),
      game: 'leagueoflegends'
    }
    ,
    {
      title: '7 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(7, 'days').unix(),
      game: 'other'
    }
  ];

  export const output: MatchProps[] = [
    {
      title: 'Finished Over An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'CollegeVALORANT',
      matchTime: dayjs().subtract(1, 'hour').unix(),
      game: 'valorant'
    },
    {
      title: 'Started Almost An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'rocketleague ',
      matchTime: dayjs().subtract(1, 'hour').add(1, 'second').unix(),
      game: 'rocketleague'
    },
    {
      title: 'Started A Minute Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().subtract(1, 'minute').unix(),
      game: 'fifa'
    },
    {
      title: 'Starts In A Minute',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(1, 'minute').unix(),
      game: 'nba2k'
    },
    {
      title: 'Starts In An Hour',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(1, 'hour').unix(),
      game: 'smashultimate'
    },
    {
      title: '6 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'nacestarleague',
      matchTime: dayjs().add(6, 'days').unix(),
      game: 'leagueoflegends'
    }
    ,
    {
      title: '7 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: dayjs().add(7, 'days').unix(),
      game: 'other'
    }
  ];