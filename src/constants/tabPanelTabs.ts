import type { TabPanel } from '@/types/TabPanel';

export const TEAMS_PAGE_TABS: TabPanel = {
  all: {
    id: 1,
    name: 'Todos',
  },
  favorites: {
    id: 2,
    name: 'Favoritos',
  },
};

export const LEAGUES_PAGE_TABS: TabPanel = {
  all: {
    id: 1,
    name: 'Todos',
  },
  cup: {
    id: 2,
    name: 'Copa',
  },
  playOffs: {
    id: 3,
    name: 'Eliminatórias',
  },
  leagues: {
    id: 4,
    name: 'Pontos corridos',
  },
};

export const LEAGUE_PANEL_TABS: TabPanel = {
  standings: {
    id: 1,
    name: 'Tabela',
  },
  matches: {
    id: 2,
    name: 'Partidas',
  },
};
