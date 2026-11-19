import { v4 } from 'uuid';

const NON_ENGLISH_CHARACTERS_REGEX = /[\u0300-\u036F]/g;

export function uuidv4() {
  return v4() as UUID;
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

export function matchesSearch(query: string, text: string): boolean {
  if (query === '') return true;
  return normalizeString(text).toLowerCase().includes(normalizeString(query).toLowerCase());
}

export function hasChanges<T extends object>(current: T, original: T): boolean {
  return JSON.stringify(current) !== JSON.stringify(original);
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
