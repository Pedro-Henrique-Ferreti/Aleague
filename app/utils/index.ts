import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { v4 } from 'uuid';

const NON_ENGLISH_CHARACTERS_REGEX = /[\u0300-\u036F]/g;

export function uuidv4() {
  return v4() as UUID;
}

export function formatDate(date?: string | Date | null, dateFormat?: string) {
  return (!date || !dateFormat) ? '' : format(new Date(date), dateFormat, { locale: ptBR });
}

export function downloadFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export function normalizeString(str: string) {
  return str.normalize('NFD').replace(NON_ENGLISH_CHARACTERS_REGEX, '');
}

export function clone<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

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

export function getRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getShortestItem<T>(array: T[], getSize: (item: T) => number): T {
  return array.reduce((shortest, current) => getSize(current) < getSize(shortest) ? current : shortest);
}

export function matchesSearch(query: string, text: string): boolean {
  if (query === '') return true;
  return normalizeString(text).toLowerCase().includes(normalizeString(query).toLowerCase());
}

export function hasChanges<T extends object>(current: T, original: T): boolean {
  return JSON.stringify(current) !== JSON.stringify(original);
}
