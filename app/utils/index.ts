import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}