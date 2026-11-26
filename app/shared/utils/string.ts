const NON_ENGLISH_CHARACTERS_REGEX = /[\u0300-\u036F]/g;

export function normalizeString(str: string) {
  return str.normalize('NFD').replace(NON_ENGLISH_CHARACTERS_REGEX, '');
}

export function matchesSearch(query: string, text: string): boolean {
  if (query === '') return true;
  return normalizeString(text).toLowerCase().includes(normalizeString(query).toLowerCase());
}
