import { generateTournamentFile } from '~/helpers/file';

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

  async function downloadSourceFile(tournamentId: Tournament['id']) {
    const tournament = tournamentStore.getTournament(tournamentId);

    const sourceFile = (
      tournament.collectionId
        ? generateCollectionFile(getCollection(tournament.collectionId))
        : generateTournamentFile(tournament)
    );

    const textStream = new Blob([JSON.stringify(sourceFile)]).stream();
    const compressedStream = textStream.pipeThrough(new CompressionStream('gzip'));
    const compressedBlob = await new Response(compressedStream).blob();

    downloadFile(
      compressedBlob,
      `${normalizeString(sourceFile.data.name).replace(/[^a-z0-9]/gi, '_')}.json`,
    );
  }

  return { downloadSourceFile };
}
