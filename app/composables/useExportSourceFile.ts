import { createCollectionFile, createTournamentFile } from '~/helpers/file';

const NON_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

export function useExportSourceFile() {
  const tournamentStore = useTournamentStore();
  const { getCollection } = useCollectionStore();

  async function downloadSourceFile(sourceFile: TournamentFile | CollectionFile) {
    const textStream = new Blob([JSON.stringify(sourceFile)]).stream();
    const compressedStream = textStream.pipeThrough(new CompressionStream('gzip'));
    const compressedBlob = await new Response(compressedStream).blob();

    downloadFile(
      compressedBlob,
      `${normalizeString(sourceFile.data.name).replace(NON_ALPHANUMERIC_REGEX, '_')}.json`,
    );
  }

  function downloadCollectionFile(id: CollectionFile['id']) {
    const collection = getCollection(id);

    if (!collection) return;

    tournamentStore.tournamentList.forEach((tournament) => {
      if (tournament.collectionId === id) {
        tournamentStore.updateTimestamps(tournament.id);
      }
    });

    return downloadSourceFile(createCollectionFile(collection, tournamentStore.tournamentList));
  }

  function downloadTournamentFile(id: Tournament['id']) {
    const tournament = tournamentStore.getTournament(id);

    if (!tournament) return;

    if (tournament.collectionId) {
      return downloadCollectionFile(tournament.collectionId);
    }

    tournamentStore.updateTimestamps(id);

    return downloadSourceFile(createTournamentFile(tournament));
  }

  return {
    downloadTournamentFile,
    downloadCollectionFile,
  };
}
