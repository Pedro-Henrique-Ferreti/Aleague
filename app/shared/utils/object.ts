export function clone<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

export function hasChanges<T extends object>(current: T, original: T): boolean {
  return JSON.stringify(current) !== JSON.stringify(original);
}
