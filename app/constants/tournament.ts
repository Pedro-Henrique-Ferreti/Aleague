const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const ICON_OPTIONS: Readonly<SelectOptionList<Tournament['icon']>> = [
  ...createArray(TOURNAMENT_NUMBER_OF_ICONS, index => ({
    label: `Logo ${index + 1}`,
    value: `/images/icons/tournament/icon-${index + 1}.svg`,
  })),
  { label: 'Campeonato Paulista 2026', value: '/images/icons/tournament/Paulistao_2026.png' },
  { label: 'Campeonato Paulista A2 2025', value: '/images/icons/tournament/Paulistao_A2_2025.png' },
  { label: 'Campeonato Brasileiro Série A', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_A.png' },
  { label: 'Campeonato Brasileiro Série B', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_B.png' },
  { label: 'Campeonato Brasileiro Série C', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_C.png' },
  { label: 'Copa Libertadores', value: '/images/icons/tournament/Conmebol_Libertadores.png' },
  { label: 'Copa Sul-americana', value: '/images/icons/tournament/Conmebol_Sudamericana.png' },
];

export const PLAYOFF_ROUND_NAMES: ReadonlyArray<string> = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];

export const PLAYOFF_ORDINAL_ROUND_NAMES: ReadonlyArray<string> = [
  'Primeira Fase',
  'Segunda Fase',
  'Terceira Fase',
  'Quarta Fase',
  'Quinta Fase',
  'Sexta Fase',
  'Sétima Fase',
  'Oitava Fase',
  'Nona Fase',
  'Décima Fase',
];

export const StageConstants = {
  MIN_TEAMS: 2,
  MIN_TEAMS_PER_GROUP: 2,
  MAX_TEAMS_PER_GROUP: 32,
  MIN_ROUNDS: 1,
  MIN_GROUPS: 1,
  MAX_GROUPS: 32,
};
