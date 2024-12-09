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
