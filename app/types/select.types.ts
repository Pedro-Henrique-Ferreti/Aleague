export type SelectOptionValue = string | number | boolean | object | null;

export interface SelectOption<V extends SelectOptionValue> {
  label: string;
  value: V;
  disabled?: boolean;
  groupLabel?: string;
}

export type SelectOptionList<T extends SelectOptionValue> = SelectOption<T>[];
