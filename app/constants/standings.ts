export const STANDINGS_TYPE_OPTIONS: SelectOptionList<string> = [
  { label: 'Casa & Fora', value: '' },
  { label: 'Casa', value: 'home' },
  { label: 'Fora', value: 'away' },
];

export const STANDINGS_SORTING_OPTIONS: SelectOptionList<string> = [
  { label: 'Pontos', value: '' },
  { label: 'Vitórias', value: 'won' },
  { label: 'Derrotas', value: 'lost' },
  { label: 'Saldo', value: 'goalDifference' },
  { label: 'Melhor ataque', value: 'goalsScored' },
  { label: 'Melhor defesa', value: 'goalsReceived' },
]
