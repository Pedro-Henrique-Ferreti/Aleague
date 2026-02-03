type ImportHandler<T> = (value: T[]) => unknown;

interface ImportOptions {
  multiple?: boolean;
  fileType?: BaseFile['fileType'];
}

export function useImportFile<ParsedFileType extends SourceFile = SourceFile>(
  onImport: ImportHandler<ParsedFileType>,
  options?: ImportOptions,
) {
  const { open, onChange } = useFileDialog({
    accept: '.json',
    multiple: options?.multiple || false,
  });

  onChange(async (fileList) => {
    if (!fileList) return;

    const parsedFiles: ParsedFileType[] = [];
    const promiseList: Promise<void>[] = [];

    for (const file of fileList) {
      promiseList.push(new Promise((resolve) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          const parsedFile = JSON.parse(reader.result as string) as SourceFile;

          if (options?.fileType === undefined || parsedFile.fileType === options.fileType) {
            parsedFiles.push(parsedFile as ParsedFileType);
          }

          resolve();
        };
      
        reader.readAsText(file);
      }));
    }

    await Promise.all(promiseList);

    onImport(parsedFiles);
  });

  return { openFileExplorer: open };
}