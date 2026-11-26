import { v4 } from 'uuid';

export function uuidv4() {
  return v4() as UUID;
}

export function downloadFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
