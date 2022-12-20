import type { TabPanel } from '@/types/TabPanel';
import { competitionFormats } from './competitionFormats';

export const teamsPageTabs: TabPanel = {
  ALL: {
    id: 1,
    name: 'Todos',
  },
  FAVORITES: {
    id: 2,
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
    id: 1,
    name: 'Tabela',
  },
  MATCHES: {
    id: 2,
    name: 'Partidas',
  },
};
