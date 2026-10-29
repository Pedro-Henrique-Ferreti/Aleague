export default defineNuxtRouteMiddleware((to) => {
  const fileStore = useFileStore();
  const fileId = to.params.fileId as unknown as BaseFile['id'];

  if (!fileStore.files[fileId]) {
    return navigateTo({ name: 'home' });
  }
});
