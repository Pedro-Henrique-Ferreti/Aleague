export const useFileStore = defineStore('file', () => {
  const route = useRoute();
  const files = ref<Record<SourceFile['id'], SourceFile>>({});
  const fileSnapshots = ref<Record<SourceFile['id'], SourceFile>>({});

  const hasImportedFiles = computed(() => {
    return Object.values(files.value).length > 0;
  });

  const activeFile = computed(() => {
    return files.value[route.params.fileId as unknown as BaseFile['id']];
  });

  function createFileSnapshot(file: SourceFile) {
    fileSnapshots.value[file.id] = clone(file);
  }

  function addFileToStore(file: SourceFile): boolean {
    if (files.value[file.id]) return false;

    files.value[file.id] = file;
    createFileSnapshot(file);
    return true;
  }

  return {
    files,
    activeFile,
    addFileToStore,
    hasImportedFiles,
  };
});
