import { generateTournamentFile } from '~/helpers/file';

const NON_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

export function useExportSourceFile() {
  const tournamentStore = useTournamentStore();
  const { getCollection } = useCollectionStore();

  function generateCollectionFile(collection: Collection): CollectionFile {
    return {
      id: collection.id,
      type: SourceFileType.COLLECTION,
      createdAt: collection.createdAt,
      data: {
        id: collection.id,
        name: collection.name,
        createdAt: collection.createdAt,
        tournaments: tournamentStore.tournaments.filter(t => t.collectionId === collection.id),
      },
    };
  }

  async function downloadSourceFile(sourceFile: TournamentFile | CollectionFile) {
    const textStream = new Blob([JSON.stringify(sourceFile)]).stream();
    const compressedStream = textStream.pipeThrough(new CompressionStream('gzip'));
    const compressedBlob = await new Response(compressedStream).blob();

    downloadFile(
      compressedBlob,
      `${normalizeString(sourceFile.data.name).replace(NON_ALPHANUMERIC_REGEX, '_')}.json`,
    );
  }

  function downloadCollectionFile(id: Collection['id']) {
    const collection = getCollection(id);
    const tournamentsInCollection = tournamentStore.tournaments.filter(t => t.collectionId === id);

    tournamentsInCollection.forEach(t => tournamentStore.updateTimestamps(t.id));

    return downloadSourceFile(generateCollectionFile(collection));
  }

  function downloadTournamentFile(id: Tournament['id']) {
    const tournament = tournamentStore.getTournament(id);

    if (tournament.collectionId) {
      return downloadCollectionFile(tournament.collectionId);
    }

    tournamentStore.updateTimestamps(id);

    return downloadSourceFile(generateTournamentFile(tournament));
  }

  return {
    downloadTournamentFile,
    downloadCollectionFile,
  };
}
