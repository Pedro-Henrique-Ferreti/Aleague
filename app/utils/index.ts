import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export { v4 as uuidv4 } from 'uuid';

export function formatDate(date: string | Date, dateFormat: string) {
  return format(new Date(date), dateFormat, { locale: ptBR });
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
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
}

export function clone<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

export function createArray<T>(length: number, fn: (index: number) => T) {
  return Array.from({ length }, (_, index) => fn(index));
}
