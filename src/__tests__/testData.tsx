import { ScheduleProps } from "../components/Schedule";

export const example: ScheduleProps = {schedule: [
    {
      title: 'One Day Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      game: 'other'
    },
    {
      title: 'Almost One Day Ago',
      home: 'Location',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() - 24 * 60 * 60 * 999),
      game: 'other'
    },
    {
      title: 'Started Almost An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'rocketleague ',
      matchTime: new Date(Date.now() - 60 * 59 * 1000),
      game: 'rocketleague'
    },
    {
      title: 'Started A Minute Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() - 60 * 1000),
      game: 'fifa'
    },
    {
      title: 'Starts In A Minute',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() + 60 * 1000),
      game: 'nba2k'
    },
    {
      title: 'Starts In An Hour',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() + 60 * 60 * 1000),
      game: 'smashultimate'
    },
    {
      title: 'Finished Over An Hour Ago',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'CollegeVALORANT',
      matchTime: new Date(Date.now() - 60 * 60 * 1000),
      game: 'valorant'
    },
    {
      title: '6 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'nacestarleague',
      matchTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      game: 'leagueoflegends'
    }
    ,
    {
      title: '7 Days From Now',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'radfordesports',
      matchTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      game: 'other'
    }
  ]};