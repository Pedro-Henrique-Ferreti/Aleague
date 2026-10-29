import { isCollectionFile, isTournamentFile, newBaseFileId, newTimestamp } from '~/helpers/file';
import { getTournamentWinner, newTournament, newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const fileStore = useFileStore();
  const tournaments = ref<Record<Tournament['id'], Tournament>>({});
  const snapshots = ref<Record<Tournament['id'], Tournament>>({});
  const activeTournamentId = ref<Tournament['id']>();

  const activeTournament = computed({
    get: () => {
      if (!fileStore.activeFile) return undefined;

      if (isTournamentFile(fileStore.activeFile)) {
        return fileStore.activeFile.data;
      }

      return fileStore.activeFile.data.tournaments.find(t => t.id === activeTournamentId.value); // TODO: refactor collection.tournaments to Record<>
    },
    set: (value) => {
      // TODO: Test whether object reference is sufficient to update file keys
      if (value && fileStore.activeFile && isTournamentFile(fileStore.activeFile)) {
        fileStore.activeFile.data = value;
      } else if (value && fileStore.activeFile && isCollectionFile(fileStore.activeFile)) {
        const index = fileStore.activeFile.data.tournaments.findIndex(t => t.id === activeTournamentId.value);
        fileStore.activeFile.data.tournaments[index] = value;
      }
    },
  });

  const tournamentList = computed(() => Object.values(tournaments.value));

  const nonCollectionTournaments = computed(() => tournamentList.value.filter(t => !t.collectionId));

  const activeTournamentWinner = computed(() => activeTournament.value ? getTournamentWinner(activeTournament.value) : null);

  function snapshotTournament(tournament: Tournament) {
    snapshots.value[tournament.id] = clone(tournament);
  }
  
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
    snapshotTournament(tournament);
    return true;
  }

  function createTournament(payload: TournamentForm) {
    const tournament = newTournament(payload);

    if (fileStore.activeFile && isCollectionFile(fileStore.activeFile)) {
      fileStore.activeFile.data.tournaments.push(tournament);
    } else {
      fileStore.addFileToStore(createTournamentFile(tournament));
    }
  }

  function getTournament(id: Tournament['id'] | null) {
    return id ? tournaments.value[id] : undefined;
  }

  function isDirty(tournament: Tournament) {
    const snapshot = snapshots.value[tournament.id];
    return snapshot && JSON.stringify(snapshot) !== JSON.stringify(tournament);
  }

  function updateTimestamps(id: Tournament['id']) {
    const tournament = getTournament(id);

    if (!tournament) return;

    if (isDirty(tournament)) {
      tournament.updatedAt = newTimestamp();
    }

    snapshotTournament(tournament);
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

    delete snapshots.value[activeTournament.value.id];
    delete tournaments.value[activeTournament.value.id];

    activeTournamentId.value = tournamentList.value[index]?.id ?? tournamentList.value[tournamentList.value.length - 1]?.id;
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
    updateTimestamps,
    updateActiveTournament,
    duplicateActiveTournament,
    deleteActiveTournament,
    addStage,
  };
});
