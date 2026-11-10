import { isCollectionFile } from '~/helpers/file';

export const useCollectionStore = defineStore('collection', () => {
  const fileStore = useFileStore();

  const activeCollection = computed(() => {
    return fileStore.activeFile && isCollectionFile(fileStore.activeFile) ? fileStore.activeFile : undefined;
  });

  function updateCollection(id: CollectionFile['id'], payload: CollectionForm) {
    if (fileStore.files[id] && isCollectionFile(fileStore.files[id])) {
      fileStore.files[id].data = {
        ...fileStore.files[id].data,
        ...payload,
      };
    }
  }

  function addTournamentToCollection(id: CollectionFile['id'], tournament: Tournament) {
    if (fileStore.files[id] && isCollectionFile(fileStore.files[id])) {
      fileStore.files[id].data.tournaments[tournament.id] = tournament;
    }
  }

  return {
    activeCollection,
    updateCollection,
    addTournamentToCollection,
  };
});
