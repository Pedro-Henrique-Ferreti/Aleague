import type { DropdownOption } from '@/types/Dropdown';

export const NUMBER_OF_TOURNAMENT_ICONS = 40;

export const NEW_TOURNAMENT_DEFAULT_ICON_ID = 1;

export const TournamentFormat = {
  ALL_PLAY_ALL: 'all-play-all',
  PLAYOFFS: 'playoffs',
  CUSTOM: 'custom',
} as const;

export const TournamentStageConfrontation = {
  SAME_GROUP: 'against-teams-from-same-group',
  OTHER_GROUPS: 'against-teams-from-other-groups',
  ALL_AGAINST_ALL: 'all-against-all',
} as const;

export const TOURNAMENT_STAGE_CONFRONTATION_OPTIONS: DropdownOption[] = [
  { id: TournamentStageConfrontation.SAME_GROUP, text: 'Apenas contra equipes do grupo' },
  { id: TournamentStageConfrontation.OTHER_GROUPS, text: 'Apenas contra equipes de outros grupos' },
  { id: TournamentStageConfrontation.ALL_AGAINST_ALL, text: 'Todos contra todos' },
];

export const ALL_PLAY_ALL_MIN_NUMBER_OF_PARTICIPANTS = 2;
export const ALL_PLAY_ALL_MAX_NUMBER_OF_PARTICIPANTS = 24;

export const PLAYOFFS_MIN_NUMBER_OF_ROUNDS = 1;
export const PLAYOFFS_MAX_NUMBER_OF_ROUNDS = 7;

export enum PositionColor {
  GREEN = '#008F62',
  BLUE = '#0069CC',
  YELLOW = '#FCA311',
  RED = '#E73737',
  PURPLE = '#AF52DE',
  GRAY = '#ADADAD',
}

export const STANDINGS_POSITION_COLORS = [
  PositionColor.GREEN,
  PositionColor.BLUE,
  PositionColor.YELLOW,
  PositionColor.RED,
  PositionColor.PURPLE,
  PositionColor.GRAY,
] as const;
