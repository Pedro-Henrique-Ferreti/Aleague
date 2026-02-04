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
