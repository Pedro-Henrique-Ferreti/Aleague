export default defineNuxtRouteMiddleware(() => {
  const fileStore = useFileStore();

  if (!fileStore.hasImportedFiles) {
    return navigateTo({ name: 'welcome' });
  }
});
