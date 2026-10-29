import { isCollectionFile } from '~/helpers/file';

export const useCollectionStore = defineStore('collection', () => {
  const fileStore = useFileStore();
  const collections = ref<Collection[]>([]);

  const activeCollection = computed(() => {
    return fileStore.activeFile && isCollectionFile(fileStore.activeFile) ? fileStore.activeFile.data : undefined;
  });

  function getCollection(id: Collection['id'] | null) {
    return collections.value.find(i => i.id === id);
  }

  function updateCollection(id: Collection['id'], payload: CollectionForm) {
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
