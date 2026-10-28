import { newBaseFileId, newTimestamp } from './file';

export function newCollection(payload: CollectionForm): Collection {
  return {
    id: newBaseFileId(),
    createdAt: newTimestamp(),
    name: payload.name,
  };
}
