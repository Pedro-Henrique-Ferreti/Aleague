import { setUpdatedAtTimestampIfDirty } from '~/helpers/file';
import { compressSourceFile } from '~/helpers/file-compression';

const NON_ALPHANUMERIC_REGEX = /[^a-z0-9]/gi;

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

  async function exportActiveFile() {
    if (!activeFile.value) return;

    if (fileSnapshots.value[activeFile.value.id]) {
      setUpdatedAtTimestampIfDirty(activeFile.value, fileSnapshots.value[activeFile.value.id]!);
    }

    createFileSnapshot(activeFile.value);

    const compressedFile = await compressSourceFile(activeFile.value);

    downloadFile(
      compressedFile,
      `${normalizeString(activeFile.value.data.name).replace(NON_ALPHANUMERIC_REGEX, '_')}.json`,
    );
  }

  return {
    files,
    activeFile,
    addFileToStore,
    hasImportedFiles,
    exportActiveFile,
  };
});
