export interface DropdownOption<T extends string | number = string | number> {
  id: T;
  text: string;
  icon?: string;
  iconSelected?: string;
}
