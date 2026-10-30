import { isCollectionFile, isTournamentFile, newTournamentFile } from '~/helpers/file';
import { getTournamentWinner, newTournament, newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const fileStore = useFileStore();
  const activeTournamentId = ref<Tournament['id']>();

  const activeTournament = computed({
    get: () => {
      if (!fileStore.activeFile) return undefined;

      if (isTournamentFile(fileStore.activeFile)) {
        return fileStore.activeFile.data;
      }

      return activeTournamentId.value ? fileStore.activeFile.data.tournaments[activeTournamentId.value] : undefined;
    },
    set: (value) => {
      // TODO: Test whether object reference is sufficient to update file keys
      if (!value || !fileStore.activeFile) return;

      if (isTournamentFile(fileStore.activeFile)) {
        fileStore.activeFile.data = value;
      } else if (activeTournamentId.value) {
        fileStore.activeFile.data.tournaments[activeTournamentId.value] = value;
      }
    },
  });

  const activeTournamentWinner = computed(() => activeTournament.value ? getTournamentWinner(activeTournament.value) : null);

  function setActiveTournament(id?: Tournament['id']) {
    activeTournamentId.value = id;
  }

  watch(() => fileStore.activeFile, (file) => {
    setActiveTournament(!file || isCollectionFile(file) ? undefined : file.data.id);
  });

  function createTournament(payload: TournamentForm) {
    const tournament = newTournament(payload);

    if (fileStore.activeFile && isCollectionFile(fileStore.activeFile)) {
      fileStore.activeFile.data.tournaments[tournament.id] = tournament;
    } else {
      fileStore.addFileToStore(newTournamentFile(tournament));
    }
  }

  function updateActiveTournament(payload: TournamentForm) {
    if (!activeTournament.value) return;

    activeTournament.value = {
      ...activeTournament.value,
      ...payload,
    };
  }

  function addStage(form: StageForm) {
    if (!activeTournament.value) return;

    activeTournament.value.stages.push(newTournamentStage(form, activeTournament.value.stages));
  }

  return {
    activeTournament,
    activeTournamentWinner,
    setActiveTournament,
    createTournament,
    updateActiveTournament,
    addStage,
  };
});
