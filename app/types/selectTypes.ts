export type SelectOptionValue = string | number | boolean | object;

export interface SelectOption<V extends SelectOptionValue> {
  label: string;
  value: V;
  disabled?: boolean;
}

export type SelectOptionList<T extends SelectOptionValue> = SelectOption<T>[];
