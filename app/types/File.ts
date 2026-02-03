export enum ExportableFileType {
  COLLECTION,
  TOURNAMENT,
}

export interface ExportableFile {
  id: number;
  type: ExportableFileType;
}