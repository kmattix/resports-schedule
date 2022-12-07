import dayjs from "dayjs";

export const case_1 = {
  input: [
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'year').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'week').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'day').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'hour').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'minute').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'second').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'second').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'minute').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'hour').unix(),
      game: 'other'
    },
  ],
  output: [
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'hour').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'minute').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'second').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'second').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'minute').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'hour').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'day').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'week').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().add(1, 'year').unix(),
      game: 'other'
    },
  ]
}

export const case_2 = {
  input: [
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().subtract(1, 'day').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().hour(0).subtract(1, 'hour').unix(),
      game: 'other'
    },
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().hour(0).unix(),
      game: 'other'
    },
  ],
  output: [
    {
      title: 'Test',
      home: 'Home Team',
      away: 'Away Team',
      twitch: 'RadfordEsports',
      matchTime: dayjs().hour(0).unix(),
      game: 'other'
    },
  ]
}