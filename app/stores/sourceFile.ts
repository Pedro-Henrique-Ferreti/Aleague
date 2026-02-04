import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';

interface StoreState {
  files: SourceFile[];
}

export const useSourceFileStore = defineStore('source-file', {
  state: (): StoreState => ({
    files: [],
  }),
  actions: {
    createCollection(payload: CollectionForm) {
      this.files.push({
        id: getBaseFileId(),
        fileType: SourceFileType.COLLECTION,
        name: payload.name,
        tournaments: [],
        createdAt: getTimestamp(),
      } satisfies Collection);
    },
  },
});
