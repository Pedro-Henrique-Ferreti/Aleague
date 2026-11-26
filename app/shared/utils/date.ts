import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function newTimestamp() {
  return new Date().toISOString() as Timestamp;
}

export function formatDate(date?: string | Date | null, dateFormat?: string) {
  return (!date || !dateFormat) ? '' : format(new Date(date), dateFormat, { locale: ptBR });
}
