const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const ICON_OPTIONS: Readonly<SelectOptionList<Tournament['icon']>> = [
  ...createArray(TOURNAMENT_NUMBER_OF_ICONS, index => ({
    label: `Opção ${index + 1}`,
    value: `/images/icons/tournament/icon-${index + 1}.svg`,
  })),
  { label: 'Campeonato Brasileiro Série A', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_A.png' },
  { label: 'Campeonato Brasileiro Série B', value: '/images/icons/tournament/Campeonato_Brasileiro_Serie_B.png' },
  { label: 'Campeonato Brasileiro Série C', value: 'https://img.sofascore.com/api/v1/unique-tournament/1281/image' },
  { label: 'Copa do Brasil', value: 'https://img.sofascore.com/api/v1/unique-tournament/9491/image' },
  { label: 'Campeonato Paulista', value: 'https://img.sofascore.com/api/v1/unique-tournament/372/image' },
  { label: 'Campeonato Paulista A2', value: 'https://img.sofascore.com/api/v1/unique-tournament/1234/image' },
  { label: 'Campeonato Paulista A3', value: 'https://img.sofascore.com/api/v1/unique-tournament/1614/image' },
  { label: 'Campeonato Carioca', value: 'https://img.sofascore.com/api/v1/unique-tournament/92/image' },
  { label: 'Campeonato Carioca A2', value: 'https://img.sofascore.com/api/v1/unique-tournament/18644/image' },
  { label: 'Campeonato Mineiro', value: 'https://img.sofascore.com/api/v1/unique-tournament/379/image' },
  { label: 'Copa Libertadores', value: '/images/icons/tournament/Conmebol_Libertadores.png' },
  { label: 'Copa Sul-americana', value: '/images/icons/tournament/Conmebol_Sudamericana.png' },
  { label: 'Premier League', value: 'https://img.sofascore.com/api/v1/unique-tournament/17/image' },
  { label: 'LaLiga', value: 'https://img.sofascore.com/api/v1/unique-tournament/8/image' },
  { label: 'Bundesliga', value: 'https://img.sofascore.com/api/v1/unique-tournament/35/image' },
  { label: 'Italian Serie A', value: 'https://img.sofascore.com/api/v1/unique-tournament/23/image' },
  { label: 'Ligue 1', value: 'https://img.sofascore.com/api/v1/unique-tournament/34/image' },
  { label: 'UEFA Champions League', value: 'https://img.sofascore.com/api/v1/unique-tournament/7/image' },
  { label: 'UEFA Europa League', value: 'https://img.sofascore.com/api/v1/unique-tournament/679/image' },
  { label: 'UEFA Conference League', value: 'https://img.sofascore.com/api/v1/unique-tournament/17015/image' },
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
  MAX_TEAMS_PER_GROUP: 36,
  MIN_ROUNDS: 1,
  MIN_GROUPS: 1,
  MAX_GROUPS: 32,
};
