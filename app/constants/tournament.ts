const ICONS_COUNT = 40;

export const ICON_OPTIONS: Readonly<SelectOptionList<Tournament['icon']>> = [
  ...createArray(ICONS_COUNT, index => ({
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
