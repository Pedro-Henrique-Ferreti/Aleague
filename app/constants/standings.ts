export const STANDINGS_TYPE_OPTIONS: SelectOptionList<StandingsType> = [
  { label: 'Casa & Fora', value: StandingsType.OVERALL },
  { label: 'Casa', value: StandingsType.HOME },
  { label: 'Fora', value: StandingsType.AWAY },
];

export const STANDINGS_ORDERING_OPTIONS: SelectOptionList<OrderingCriteria> = [
  { label: 'Pontos', value: OrderingCriteria.POINTS },
  { label: 'Vitórias', value: OrderingCriteria.WON },
  { label: 'Derrotas', value: OrderingCriteria.LOST },
  { label: 'Saldo', value: OrderingCriteria.GOALS_DIFFERENCE },
  { label: 'Melhor ataque', value: OrderingCriteria.GOALS_FOR },
  { label: 'Melhor defesa', value: OrderingCriteria.GOALS_AGAINST },
];

export const POINTS_PER_WIN = 3;
export const POINTS_PER_DRAW = 1;
export const POINTS_PER_LOSE = 0;
