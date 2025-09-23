const TOURNAMENT_NUMBER_OF_ICONS = 40;

export const TOURNAMENT_ICONS_OPTIONS: SelectOptionList<number> = Array.from(
  { length: TOURNAMENT_NUMBER_OF_ICONS },
  (_, index) => ({
    label: `Avatar ${index + 1}`,
    value: index + 1,
  }),
);
