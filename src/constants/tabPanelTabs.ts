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
    elementId: 'competition-page-tab--all',
  },
  CUP: {
    id: competitionFormats.CUP.value,
    elementId: 'competition-page-tab--cup',
    name: 'Copa',
  },
  PLAYOFFS: {
    id: competitionFormats.PLAYOFF.value,
    elementId: 'competition-page-tab--playoff',
    name: 'Eliminatórias',
  },
  LEAGUES: {
    id: competitionFormats.LEAGUE.value,
    elementId: 'competition-page-tab--league',
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
