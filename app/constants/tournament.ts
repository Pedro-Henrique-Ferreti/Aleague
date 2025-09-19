export const TOURNAMENT_FORMAT_OPTIONS: SelectOptionList<TournamentFormat> = [
  { label: 'Pontos corridos', value: TournamentFormat.ALL_PLAY_ALL },
  { label: 'Eliminatórias', value: TournamentFormat.PLAYOFFS },
  { label: 'Personalizado', value: TournamentFormat.CUSTOM },
];
