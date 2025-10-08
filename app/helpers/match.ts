export function getKickoffDisplayText(value: MatchKickoff, formatStr = 'EEEEEE kk\'h\'mm'): string {
  return formatDate(value, formatStr).replace('sab', 'sáb');
}