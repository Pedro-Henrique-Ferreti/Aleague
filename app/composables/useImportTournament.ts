type ImportHandler = (value: Tournament[]) => unknown;

interface ImportOptions {
  multiple?: boolean;
}

export function useImportTournament(onImport: ImportHandler, options?: ImportOptions) {
  const { open, onChange } = useFileDialog({
    accept: '.json',
    multiple: options?.multiple || false,
  });

  onChange(async (files) => {
    if (!files) return;

    const tournaments: Tournament[] = [];

    const promises: Promise<void>[] = [];

    for (const file of files) {
      promises.push(new Promise((resolve) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          tournaments.push(JSON.parse(reader.result as string) as Tournament);

          resolve();
        };
      
        reader.readAsText(file);
      }));
    }

    await Promise.all(promises);

    onImport(tournaments);
  });

  return { start: open };
}