import { appendNumericSuffix, getBaseFileId, getTimestamp } from '~/helpers/file';
import { newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const tournaments = ref<Record<Tournament['id'], Tournament>>({});
  const snapshots = ref<Record<Tournament['id'], Tournament>>({});
  const activeTournamentId = ref<Tournament['id']>();

  const activeTournament = computed({
    get: () => activeTournamentId.value ? tournaments.value[activeTournamentId.value] : undefined,
    set: (value) => {
      if (activeTournamentId.value && value) {
        tournaments.value[activeTournamentId.value] = value;
      }
    },
  });

  const tournamentList = computed(() => Object.values(tournaments.value));

  const nonCollectionTournaments = computed(() => tournamentList.value.filter(t => !t.collectionId));

  function snapshotTournament(tournament: Tournament) {
    snapshots.value[tournament.id] = clone(tournament);
  }

  function pushTournament(tournament: Tournament): boolean {
    if (tournaments.value[tournament.id]) return false;

    tournaments.value[tournament.id] = tournament;
    snapshotTournament(tournament);
    return true;
  }

  function createTournament(payload: TournamentForm) {
    const id = getBaseFileId();
    const timestamp = getTimestamp();

    pushTournament({
      ...payload,
      id: getBaseFileId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      stages: [],
    });

    activeTournamentId.value = id;
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
      tournament.updatedAt = getTimestamp();
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

  function duplicateActiveTournament() {
    if (!activeTournament.value) return;

    const id = getBaseFileId();
    const timestamp = getTimestamp();

    pushTournament({
      ...clone(activeTournament.value),
      id,
      name: appendNumericSuffix(activeTournament.value.name, tournamentList.value),
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
    nonCollectionTournaments,
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
