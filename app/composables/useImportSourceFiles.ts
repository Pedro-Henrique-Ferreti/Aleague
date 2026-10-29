import { isCollectionFile, isTournamentFile } from '~/helpers/file';
import { decompressSourceFile } from '~/helpers/file-compression';

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

    for (const file of files) {
      promiseList.push(new Promise((resolve) => {
        decompressSourceFile(file).then((sourceFile) => {
          if (isCollectionFile(sourceFile)) {
            collectionFiles.push(sourceFile);
          } else if (isTournamentFile(sourceFile)) {
            tournamentFiles.push(sourceFile);
          }

          resolve();
        });
      }));
    }

    await Promise.all(promiseList);

    onImport({ collectionFiles, tournamentFiles });
  });

  return { openFileExplorer: open };
}
