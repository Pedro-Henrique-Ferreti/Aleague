const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const ICON_OPTIONS: Readonly<SelectOptionList<Tournament['icon']>> = [
  ...Array.from(
    { length: TOURNAMENT_NUMBER_OF_ICONS },
    (_, index) => ({
      label: `Logo ${index + 1}`,
      value: `/images/icons/tournament/icon-${index + 1}.svg`,
    }),
  ),
];

export const TOURNAMENT_GROUP_FORMAT_OPTIONS: Readonly<SelectOptionList<TournamentGroupFormat>> = [
  { label: 'Equipes do mesmo grupo', value: TournamentGroupFormat.ROUND_ROBIN },
  { label: 'Apenas equipes de outros grupos', value: TournamentGroupFormat.OTHER_GROUPS_ROUND_ROBIN },
  { label: 'Todos contra todos', value: TournamentGroupFormat.ALL_PLAY_ALL },
];

export const PLAYOFF_ROUND_NAMES: ReadonlyArray<string> = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];
