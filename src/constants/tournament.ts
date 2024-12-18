import type { TabPanel } from '@/types/TabPanel';

export const NUMBER_OF_TOURNAMENT_ICONS = 40;

export const NEW_TOURNAMENT_DEFAULT_ICON_ID = 1;

export const TournamentFormat = {
  ALL_PLAY_ALL: 'all-play-all',
  PLAYOFFS: 'playoffs',
  CUSTOM: 'custom',
} as const;

export const TournamentStageConfrontation = {
  AGAINST_TEAMS_FROM_SAME_GROUP: 'against-teams-from-same-group',
  AGAINST_TEAMS_FROM_OTHER_GROUPS: 'against-teams-from-other-groups',
  ALL_AGAINST_ALL: 'all-against-all',
} as const;

export const ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS = 2;
export const ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS = 24;

export const PLAYOFFS_MIN_NUMBER_OF_ROUNDS = 1;
export const PLAYOFFS_MAX_NUMBER_OF_ROUNDS = 7;

export const EditTournamentTab: TabPanel = {
  SETTINGS: {
    id: 'edit-tournament-tab-settings',
    name: 'Geral',
  },
  SUBTITLES: {
    id: 'edit-tournament-tab-subtitles',
    name: 'Legendas',
  },
  FIXTURES: {
    id: 'edit-tournament-tab-fixtures',
    name: 'Partidas',
  },
} as const;

export const STANDINGS_SUBTITLE_COLORS = [
  '#008F62', '#0069CC', '#FCA311', '#E73737', '#ADADAD', '#AF52DE',
] as const;
