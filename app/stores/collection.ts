import { newCollection } from '~/helpers/collection';
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

  function createCollection(payload: CollectionForm) {
    const collection = newCollection(payload);

    collections.value.push(collection);
  }

  function updateCollection(id: Collection['id'], payload: CollectionForm) {
    const index = collections.value.findIndex(i => i.id === id);

    if (index === -1) throw new Error('Collection not found');

    collections.value[index] = {
      ...collections.value[index] as Collection,
      ...payload,
    };
  }

  return {
    collections,
    activeCollection,
    getCollection,
    createCollection,
    updateCollection,
  };
});
