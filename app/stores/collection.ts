import { getBaseFileId, getTimestamp } from '~/helpers/file';

export const useCollectionStore = defineStore('collection', () => {
  const tournamentStore = useTournamentStore();
  const collections = ref<Collection[]>([]);
  const activeCollectionId = ref<Collection['id']>();

  const activeCollection = computed(() => {
    return collections.value.find(i => i.id === activeCollectionId.value);
  });

  watch([
    () => tournamentStore.activeTournament,
    () => tournamentStore.activeTournament?.collectionId,
  ], () => {
    if (tournamentStore.activeTournament) {
      activeCollectionId.value = tournamentStore.activeTournament.collectionId ?? undefined;
    }
  });

  function setActiveCollection(id: Collection['id']) {
    activeCollectionId.value = id;
    tournamentStore.activeTournamentId = undefined;
  }

  function getCollection(id: Collection['id'] | null): Collection {
    const collection = collections.value.find(i => i.id === id);

    if (!collection) throw new Error('Collection not found');

    return collection;
  }

  function createCollection(payload: CollectionForm) {
    collections.value.push({
      id: getBaseFileId(),
      createdAt: getTimestamp(),
      name: payload.name,
    } satisfies Collection);
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
    activeCollectionId,
    activeCollection,
    setActiveCollection,
    getCollection,
    createCollection,
    updateCollection,
  };
});
