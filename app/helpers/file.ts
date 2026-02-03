export const getExportableFileId = (): ExportableFile['id'] => new Date().getTime();

export const getTimestamp = (): string => new Date().toISOString();