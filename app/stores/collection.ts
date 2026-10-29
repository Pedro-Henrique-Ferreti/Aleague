import { isCollectionFile } from '~/helpers/file';

export const useCollectionStore = defineStore('collection', () => {
  const fileStore = useFileStore();
  const collections = ref<Collection[]>([]);

  const activeCollection = computed(() => {
    return fileStore.activeFile && isCollectionFile(fileStore.activeFile) ? fileStore.activeFile : undefined;
  });

  function getCollection(id: CollectionFile['id'] | null) {
    return id ? fileStore.files[id] : undefined;
  }

  function updateCollection(id: CollectionFile['id'], payload: CollectionForm) {
    if (fileStore.files[id] && isCollectionFile(fileStore.files[id])) {
      fileStore.files[id].data = {
        ...fileStore.files[id].data,
        ...payload,
      };
    }
  }

  return {
    collections,
    activeCollection,
    getCollection,
    updateCollection,
  };
});
