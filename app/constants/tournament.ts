const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const ICON_OPTIONS: Readonly<SelectOptionList<Tournament['icon']>> = [
  ...Array.from(
    { length: TOURNAMENT_NUMBER_OF_ICONS },
    (_, index) => ({
      label: `Logo ${index + 1}`,
      value: `/images/icons/tournament/icon-${index + 1}.svg`,
    }),
  ),
  { label: 'Campeonato Paulista 2026', value: '/images/icons/tournament/Paulistao_2026.png' },
  { label: 'Campeonato Paulista A2 2025', value: '/images/icons/tournament/Paulistao_A2_2025.png' },
  { label: 'Campeonato Brasileiro Série A', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_A.png' },
  { label: 'Campeonato Brasileiro Série B', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_B.png' },
  { label: 'Campeonato Brasileiro Série C', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_C.png' },
  { label: 'Copa Libertadores', value: '/images/icons/tournament/Conmebol_Libertadores.png' },
  { label: 'Copa Sul-americana', value: '/images/icons/tournament/Conmebol_Sudamericana.png' },
];

export const TOURNAMENT_GROUP_FORMAT_OPTIONS: Readonly<SelectOptionList<TournamentGroupFormat>> = [
  { label: 'Equipes do mesmo grupo', value: TournamentGroupFormat.ROUND_ROBIN },
  { label: 'Apenas equipes de outros grupos', value: TournamentGroupFormat.OTHER_GROUPS_ROUND_ROBIN },
  { label: 'Todos contra todos', value: TournamentGroupFormat.ALL_PLAY_ALL },
];

export const PLAYOFF_ROUND_NAMES: ReadonlyArray<string> = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];

export const StageConstants = {
  MIN_TEAMS: 2,
  MIN_TEAMS_PER_GROUP: 2,
  MAX_TEAMS_PER_GROUP: 32,
  MIN_ROUNDS: 1,
  MIN_GROUPS: 1,
  MAX_GROUPS: 32,
};
