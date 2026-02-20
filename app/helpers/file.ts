export const getBaseFileId = (): BaseFile['id'] => new Date().getTime();

export const getTimestamp = (): string => new Date().toISOString();

export function appendNumericSuffix(name: Tournament['name'], tournaments: Tournament[]) {
  const removeSuffix = (str: string) => str.replace(/\(\d+\)/, '').trim();

  const parsedName = removeSuffix(name);
  const sameNameCount = tournaments.filter(t => removeSuffix(t.name).startsWith(parsedName)).length;

  return `${parsedName} (${sameNameCount + 1})`;
}
