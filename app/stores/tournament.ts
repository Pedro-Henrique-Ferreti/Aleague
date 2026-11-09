import { isCollectionFile, isTournamentFile, newTournamentFile } from '~/helpers/file';
import { getTournamentWinner, newTournament, newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const route = useRoute();
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
      if (!value || !fileStore.activeFile) return;

      if (isTournamentFile(fileStore.activeFile)) {
        fileStore.activeFile.data = value;
      } else if (activeTournamentId.value) {
        fileStore.activeFile.data.tournaments[activeTournamentId.value] = value;
      }
    },
  });

  const activeTournamentWinner = computed(() => activeTournament.value ? getTournamentWinner(activeTournament.value) : null);

  watchEffect(() => {
    if (!fileStore.activeFile) {
      activeTournamentId.value = undefined;
    } else if (isTournamentFile(fileStore.activeFile)) {
      activeTournamentId.value = fileStore.activeFile.data.id;
    } else {
      activeTournamentId.value = route.params.tournamentId as unknown as Tournament['id'];
    }
  });

  function createTournament(payload: TournamentForm) {
    const tournament = newTournament(payload);

    if (fileStore.activeFile && isCollectionFile(fileStore.activeFile)) {
      fileStore.activeFile.data.tournaments[tournament.id] = tournament;
    } else {
      fileStore.addFileToStore(newTournamentFile(tournament));
    }
  }

  function updateTournament(id: Tournament['id'], fileId: SourceFile['id'], payload: TournamentForm) {
    const file = fileStore.files[fileId];

    if (!file) return;

    if (isCollectionFile(file) && file.data.tournaments[id]) {
      file.data.tournaments[id] = {
        ...file.data.tournaments[id],
        ...clone(payload),
      };
    } else if (isTournamentFile(file) && file.data.id === id) {
      file.data = {
        ...file.data,
        ...clone(payload),
      };
    }
  }

  function addStage(form: StageForm) {
    if (!activeTournament.value) return;

    activeTournament.value.stages.push(newTournamentStage(form, activeTournament.value.stages));
  }

  return {
    activeTournament,
    activeTournamentWinner,
    createTournament,
    updateTournament,
    addStage,
  };
});
