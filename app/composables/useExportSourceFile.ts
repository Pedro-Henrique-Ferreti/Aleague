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

  function downloadSourceFile(tournamentId: Tournament['id']) {
    const tournament = tournamentStore.getTournament(tournamentId);

    const sourceFile = (
      tournament.collectionId
        ? generateCollectionFile(getCollection(tournament.collectionId))
        : generateTournamentFile(tournament)
    );

    downloadFile(
      new Blob([JSON.stringify(sourceFile)], { type: 'application/json' }),
      `${normalizeString(sourceFile.data.name).replace(/[^a-z0-9]/gi, '_')}.json`,
    );
  }

  return { downloadSourceFile };
}
