export type Branded<T, U> = T & { readonly __brand: U };

export type Entries<T> = Array<{
  [K in keyof T]: [K, T[K]]
}[keyof T]
>;

export type UUID = Branded<string, 'UUID'>;
