import type { TabPanel } from '@/types/TabPanel';

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
    id: 1,
    name: 'Todos',
  },
  CUP: {
    id: 2,
    name: 'Copa',
  },
  PLAY_OFFS: {
    id: 3,
    name: 'Eliminatórias',
  },
  LEAGUES: {
    id: 4,
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
