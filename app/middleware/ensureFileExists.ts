import { isCollectionFile } from '~/helpers/file';

export default defineNuxtRouteMiddleware((to) => {
  const fileStore = useFileStore();
  const fileId = to.params.fileId as unknown as BaseFile['id'];
  const tournamentId = to.params.tournamentId as unknown as Tournament['id'] | undefined;
  const file = fileStore.files[fileId];

  if (!file) {
    return navigateTo({ name: 'home' });
  }

  if (tournamentId && isCollectionFile(file) && !file.data.tournaments[tournamentId]) {
    return navigateTo({ name: 'editor', params: { fileId } });
  }
});
