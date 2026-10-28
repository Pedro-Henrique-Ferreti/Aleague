export const useFileStore = defineStore('file', () => {
  const files = ref<Record<SourceFile['id'], SourceFile>>({});
  const fileSnapshots = ref<Record<SourceFile['id'], SourceFile>>({});

  function createFileSnapshot(file: SourceFile) {
    fileSnapshots.value[file.id] = clone(file);
  }

  function addFileToStore(file: SourceFile): boolean {
    if (files.value[file.id]) return false;

    files.value[file.id] = file;
    createFileSnapshot(file);
    return true;
  }

  const hasImportedFiles = computed(() => {
    return Object.values(files.value).length > 0;
  });

  return {
    files,
    addFileToStore,
    hasImportedFiles,
  };
});
