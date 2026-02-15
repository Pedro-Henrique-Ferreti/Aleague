import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';

interface State {
  collections: Collection[];
}

export const useCollectionStore = defineStore('collection', {
  state: (): State => ({
    collections: [],
  }),
  getters: {
    activeCollection(state) {
      const tournamentStore = useTournamentStore();
      return state.collections.find(i => i.id === tournamentStore.activeTournament?.collectionId);
    },
  },
  actions: {
    getCollection(id: Collection['id'] | null): Collection {
      const collection = this.collections.find(i => i.id === id);

      if (!collection) throw new Error('Collection not found');

      return collection;
    },
    createCollection(payload: CollectionForm) {
      this.collections.push({
        id: getBaseFileId(),
        createdAt: getTimestamp(),
        name: payload.name,
      } satisfies Collection);
    },
    updateCollection(id: Collection['id'], payload: CollectionForm) {
      const index = this.collections.findIndex(i => i.id === id);

      if (index === -1) throw new Error('Collection not found');

      this.collections[index] = {
        ...this.collections[index] as Collection,
        ...payload,
      };
    },
  },
});
