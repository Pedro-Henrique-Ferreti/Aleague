import { isCollectionFile, isTournamentFile, newBaseFileId, newTimestamp, newTournamentFile } from '~/helpers/file';
import { getTournamentWinner, newTournament, newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const fileStore = useFileStore();
  const tournaments = ref<Record<Tournament['id'], Tournament>>({});
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

  const tournamentList = computed(() => Object.values(tournaments.value));

  const nonCollectionTournaments = computed(() => tournamentList.value.filter(t => !t.collectionId));

  const activeTournamentWinner = computed(() => activeTournament.value ? getTournamentWinner(activeTournament.value) : null);

  function setActiveTournament(id?: Tournament['id']) {
    activeTournamentId.value = id;
  }

  watch(() => fileStore.activeFile, (file) => {
    if (!file || isCollectionFile(file)) {
      setActiveTournament(undefined);
    } else if (file && isTournamentFile(file)) {
      setActiveTournament(file.data.id);
    }
  });

  function pushTournament(tournament: Tournament): boolean {
    if (tournaments.value[tournament.id]) return false;

    tournaments.value[tournament.id] = tournament;
    return true;
  }

  function createTournament(payload: TournamentForm) {
    const tournament = newTournament(payload);

    if (fileStore.activeFile && isCollectionFile(fileStore.activeFile)) {
      fileStore.activeFile.data.tournaments[tournament.id] = tournament;
    } else {
      fileStore.addFileToStore(newTournamentFile(tournament));
    }
  }

  function getTournament(id: Tournament['id'] | null) {
    return id ? tournaments.value[id] : undefined;
  }

  function updateActiveTournament(payload: TournamentForm) {
    if (!activeTournament.value) return;

    activeTournament.value = {
      ...activeTournament.value,
      ...payload,
    };
  }

  function duplicateActiveTournament(form: DuplicateTournamentForm) {
    if (!activeTournament.value) return;

    const id = newBaseFileId();
    const timestamp = newTimestamp();

    pushTournament({
      ...clone(activeTournament.value),
      id,
      name: form.name,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    activeTournamentId.value = id;
  }

  function deleteActiveTournament() {
    if (!activeTournament.value) return;

    const index = tournamentList.value.findIndex(i => i.id === activeTournament.value?.id);

    delete tournaments.value[activeTournament.value.id];

    activeTournamentId.value = tournamentList.value[index]?.id ?? tournamentList.value.at(-1)?.id;
  }

  function addStage(form: StageForm) {
    if (!activeTournament.value) return;

    activeTournament.value.stages.push(newTournamentStage(form, activeTournament.value.stages));
  }

  return {
    tournamentList,
    activeTournamentId,
    activeTournament,
    activeTournamentWinner,
    nonCollectionTournaments,
    setActiveTournament,
    createTournament,
    pushTournament,
    getTournament,
    updateActiveTournament,
    duplicateActiveTournament,
    deleteActiveTournament,
    addStage,
  };
});
