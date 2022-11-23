import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from 'react-helmet';
import { MatchProps } from './components/Match';
import Schedule from './components/Schedule';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './assets/theme';

function App() {
  const scheduleItems: Array<MatchProps> = [{
      title: 'MAEC League-Play',
      home: 'Radford University',
      away: 'Howard CC Dragons',
      twitch: 'radfordesports',
      matchTime: new Date("December 9, 2022 20:00:00"),
      game: 'rocketleague'
    },
    {
      title: 'MAEC League-Play',
      home: 'Radford University',
      away: 'RMC Yellow Jackets',
      twitch: 'radfordesports',
      matchTime: new Date("December 16, 2022 20:00:00"),
      game: 'rocketleague'
    },
    {
      title: 'NACE League-Play',
      home: 'Radford University',
      away: 'Louisianna State',
      twitch: 'radfordesports',
      matchTime: new Date("12 2, 2022 20:00:00"),
      game: 'valorant'
    },
    {
      title: 'Misc Tournament',
      home: 'Radford University',
      away: 'N/A',
      twitch: 'radfordesports',
      matchTime: new Date("November 14, 2022 20:00:00"),
      game: 'other'
    },
    {
      title: 'MAEC League-Play',
      home: 'Radford University',
      away: 'GMU Patriots',
      twitch: 'midatlanticesports',
      matchTime: new Date("November 23, 2022 20:00:00"),
      game: 'leagueoflegends'
    }];

    scheduleItems.sort((a, b) => {
      return a.matchTime.getTime() - b.matchTime.getTime();
    })

  return (
  <>
    <Helmet>
      <style>{`body { background-color: ${defaultTheme.palette.background.default}; }`}</style>
    </Helmet>
    <ThemeProvider theme={defaultTheme}>
      <Schedule schedule={scheduleItems}></Schedule>
    </ThemeProvider>
  </>);
}

export default App;
