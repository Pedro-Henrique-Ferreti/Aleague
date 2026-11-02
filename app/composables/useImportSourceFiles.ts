import { isCollectionFile, isTournamentFile } from '~/helpers/file';
import { decompressSourceFile } from '~/helpers/file-compression';

interface ImportResult<T extends SourceFile> {
  fileName: File['name'];
  sourceFile: T;
}

export interface UseImportSourceFilesHandlerParams {
  collectionFiles: ImportResult<CollectionFile>[];
  tournamentFiles: ImportResult<TournamentFile>[];
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

    const collectionFiles: UseImportSourceFilesHandlerParams['collectionFiles'] = [];
    const tournamentFiles: UseImportSourceFilesHandlerParams['tournamentFiles'] = [];
    const promiseList: Promise<void>[] = [];

    for (const file of files) {
      promiseList.push(new Promise((resolve) => {
        decompressSourceFile(file).then((sourceFile) => {
          if (isCollectionFile(sourceFile)) {
            collectionFiles.push({ fileName: file.name, sourceFile });
          } else if (isTournamentFile(sourceFile)) {
            tournamentFiles.push({ fileName: file.name, sourceFile });
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
