export const getBaseFileId = (): BaseFile['id'] => new Date().getTime();

export const getTimestamp = (): string => new Date().toISOString();