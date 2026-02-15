import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
  actions: {
    downloadTournamentSourceFile(tournamentId: Tournament['id']) {
      const { getTournament } = useTournamentStore();
      const { getCollection } = useCollectionStore();

      const tournament = getTournament(tournamentId);

      const sourceFile = (
        tournament.collectionId
          ? this.generateCollectionFile(getCollection(tournament.collectionId))
          : this.generateTournamentFile(tournament)
      );

      downloadFile(
        new Blob([JSON.stringify(sourceFile)], { type: 'application/json' }),
        `${normalizeString(sourceFile.data.name).replace(/[^a-z0-9]/gi, '_')}.json`,
      );
    },
    generateCollectionFile(collection: Collection): CollectionFile {
      const tournamentStore = useTournamentStore();

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
    },
    generateTournamentFile(tournament: Tournament): TournamentFile {
      return {
        id: tournament.id,
        type: SourceFileType.TOURNAMENT,
        createdAt: tournament.createdAt,
        data: tournament,
      };
    },
  },
});
