import type { TabPanel } from '@/types/TabPanel';
import { competitionFormats } from './competitionFormats';

export const teamsPageTabs: TabPanel = {
  ALL: {
    id: 'teams-page-tab--all',
    name: 'Todos',
  },
  FAVORITES: {
    id: 'teams-page-tab--favorites',
    name: 'Favoritos',
  },
};

export const leaguePageTabs: TabPanel = {
  ALL: {
    id: 'all',
    name: 'Todos',
  },
  CUP: {
    id: competitionFormats.CUP.value,
    name: 'Copa',
  },
  PLAYOFFS: {
    id: competitionFormats.PLAYOFF.value,
    name: 'Eliminatórias',
  },
  LEAGUES: {
    id: competitionFormats.LEAGUE.value,
    name: 'Pontos corridos',
  },
};

export const leaguePanelTabs: TabPanel = {
  STANDINGS: {
    id: 'league-page-tab--standings',
    name: 'Tabela',
  },
  MATCHES: {
    id: 'league-page-tab--matches',
    name: 'Partidas',
  },
};
