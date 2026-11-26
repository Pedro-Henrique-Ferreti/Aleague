import { clone } from './object';

export function createArray<T = number>(length: number, valueOrFunction?: T | ((index: number) => T)) {
  return Array.from({ length }, (_, index) => {
    if (valueOrFunction === undefined) return index as T;

    if (typeof valueOrFunction === 'function') return (valueOrFunction as (index: number) => T)(index) as T;

    return clone(valueOrFunction) as T;
  }) as T extends number ? number[] : T extends boolean ? boolean[] : T[];
}

export function randomizeArray<T>(array: T[]) {
  return array.toSorted(() => Math.random() - 0.5);
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)] as T;
}

export function getShortestItem<T>(array: T[], getSize: (item: T) => number): T {
  return array.reduce((shortest, current) => getSize(current) < getSize(shortest) ? current : shortest);
}
