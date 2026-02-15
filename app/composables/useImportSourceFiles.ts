export interface UseImportSourceFilesHandlerParams {
  collectionFiles: CollectionFile[];
  tournamentFiles: TournamentFile[];
}

interface ImportOptions {
  multiple?: boolean;
}

export function useImportSourceFiles(
  onImport: (files: UseImportSourceFilesHandlerParams) => unknown,
  options?: ImportOptions,
) {
  const { open, onChange } = useFileDialog({
    accept: '.json',
    multiple: options?.multiple || false,
  });

  onChange(async (files) => {
    if (!files) return;

    const collectionFiles: CollectionFile[] = [];
    const tournamentFiles: TournamentFile[] = [];
    const promiseList: Promise<void>[] = [];

    for (const item of files) {
      promiseList.push(new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          const sourceFile = JSON.parse(reader.result as string) as SourceFile;

          if (sourceFile.type === SourceFileType.COLLECTION) {
            collectionFiles.push(sourceFile);
          } else if (sourceFile.type === SourceFileType.TOURNAMENT) {
            tournamentFiles.push(sourceFile);
          }

          resolve();
        };

        reader.readAsText(item);
      }));
    }

    await Promise.all(promiseList);

    onImport({ collectionFiles, tournamentFiles });
  });

  return { openFileExplorer: open };
}
