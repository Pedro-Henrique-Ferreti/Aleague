export const TABLE_ENTRY_TYPE_OPTIONS: Readonly<SelectOptionList<TableEntryType>> = [
  { label: 'Casa & Fora', value: TableEntryType.OVERALL },
  { label: 'Casa', value: TableEntryType.HOME },
  { label: 'Fora', value: TableEntryType.AWAY },
];

export const TABLE_ENTRY_SORT_TYPE_OPTIONS: Readonly<SelectOptionList<TableEntrySortType>> = [
  { label: 'Pontos', value: TableEntrySortType.POINTS },
  { label: 'Vitórias', value: TableEntrySortType.WON },
  { label: 'Derrotas', value: TableEntrySortType.LOST },
  { label: 'Saldo', value: TableEntrySortType.GOALS_DIFFERENCE },
  { label: 'Melhor ataque', value: TableEntrySortType.GOALS_FOR },
  { label: 'Melhor defesa', value: TableEntrySortType.GOALS_AGAINST },
];

export const TABLE_ENTRY_VIEW_OPTIONS: Readonly<SelectOptionList<TableEntryView>> = [
  { label: 'Por grupo', value: TableEntryView.PER_GROUP },
  { label: 'Geral', value: TableEntryView.OVERALL },
];

export const POINTS_PER_WIN = 3;
export const POINTS_PER_DRAW = 1;
export const POINTS_PER_LOSE = 0;
