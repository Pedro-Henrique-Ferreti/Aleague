export const useFileStore = defineStore('file', () => {
  const collectionStore = useCollectionStore();
  const tournamentStore = useTournamentStore();

  const hasImportedFiles = computed(() => {
    return collectionStore.collections.length > 0 || tournamentStore.tournamentList.length > 0;
  });

  return {
    hasImportedFiles,
  };
});
