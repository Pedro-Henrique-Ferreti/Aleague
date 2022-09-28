import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getFullDate(date: string) {
  return format(new Date(date), 'dd \'de\' LLLL \'de\' yyyy', { locale: ptBR });
}
