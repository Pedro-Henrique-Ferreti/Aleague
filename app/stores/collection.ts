import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';

interface State {
  collections: Collection[];
}

export const useCollectionStore = defineStore('collection', {
  state: (): State => ({
    collections: [],
  }),
  actions: {
    getCollection(id: Collection['id'] | null): Collection {
      const collection = this.collections.find((i) => i.id === id);

      if (!collection) throw new Error('Collection not found');

      return collection;
    },
    createCollection(payload: CollectionForm) {
      this.collections.push({
        id: getBaseFileId(),
        createdAt: getTimestamp(),
        name: payload.name,
        tournaments: [],
      } satisfies Collection);
    },
  },
});
