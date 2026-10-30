import { isCollectionFile, setUpdatedAtTimestampIfDirty } from '~/helpers/file';
import { compressSourceFile } from '~/helpers/file-compression';
import { copyTournament } from '~/helpers/tournament';

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

  function getCollectionFileByTournament(tournament: Tournament) {
    return Object.values(files.value).find((file) => {
      return isCollectionFile(file) && file.data.tournaments[tournament.id];
    }) as CollectionFile | undefined;
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

  function duplicateCollectionFileTournament(fileId: SourceFile['id'], tournamentId: Tournament['id'], form: DuplicateTournamentForm) {
    const file = files.value[fileId];

    if (!file || !isCollectionFile(file) || !file.data.tournaments[tournamentId]) return;

    const tournamentCopy: Tournament = {
      ...copyTournament(file.data.tournaments[tournamentId]!),
      ...form,
    };

    file.data.tournaments[tournamentCopy.id] = tournamentCopy;

    return tournamentCopy;
  }

  function deleteCollectionFileTournament(fileId: SourceFile['id'], tournamentId: Tournament['id']) {
    const file = files.value[fileId];

    if (file && isCollectionFile(file)) {
      delete file.data.tournaments[tournamentId];
    }
  }

  return {
    files,
    activeFile,
    hasImportedFiles,
    getCollectionFileByTournament,
    addFileToStore,
    exportActiveFile,
    duplicateCollectionFileTournament,
    deleteCollectionFileTournament,
  };
});
