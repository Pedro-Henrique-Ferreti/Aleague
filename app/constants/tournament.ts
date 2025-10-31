const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const TOURNAMENT_ICONS_OPTIONS: Readonly<SelectOptionList<number>> = Array.from(
  { length: TOURNAMENT_NUMBER_OF_ICONS },
  (_, index) => ({
    label: `Avatar ${index + 1}`,
    value: index + 1,
  }),
);

export const TOURNAMENT_GROUP_FORMAT_OPTIONS: Readonly<SelectOptionList<TournamentGroupFormat>> = [
  { label: 'Equipes do mesmo grupo', value: TournamentGroupFormat.ROUND_ROBIN },
  { label: 'Apenas equipes de outros grupos', value: TournamentGroupFormat.OTHER_GROUPS_ROUND_ROBIN },
  { label: 'Todos contra todos', value: TournamentGroupFormat.ALL_PLAY_ALL },
];

export const PLAYOFF_ROUND_NAMES: ReadonlyArray<string> = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];
