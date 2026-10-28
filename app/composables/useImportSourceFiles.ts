import { isCollectionFile, isTournamentFile } from '~/helpers/file';

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

    const readFile = (blob: Blob, resolve: () => void) => {
      const reader = new FileReader();

      reader.onload = () => {
        const sourceFile = JSON.parse(reader.result as string) as SourceFile;

        if (isCollectionFile(sourceFile)) {
          collectionFiles.push(sourceFile);
        } else if (isTournamentFile(sourceFile)) {
          tournamentFiles.push(sourceFile);
        }

        resolve();
      };

      reader.readAsText(blob);
    };

    for (const file of files) {
      promiseList.push(new Promise((resolve) => {
        const decompressedStream = file.stream().pipeThrough(new DecompressionStream('gzip'));

        new Response(decompressedStream).blob().then(blob => readFile(blob, resolve));
      }));
    }

    await Promise.all(promiseList);

    onImport({ collectionFiles, tournamentFiles });
  });

  return { openFileExplorer: open };
}
