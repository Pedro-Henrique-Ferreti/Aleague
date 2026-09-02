import { appendNumericSuffix, getBaseFileId, getTimestamp } from '~/helpers/file';
import { newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const tournaments = ref<Tournament[]>([]);
  const snapshots = ref<Record<Tournament['id'], Tournament>>({});
  const activeTournamentId = ref<Tournament['id']>();

  const activeTournament = computed({
    get: () => tournaments.value.find(t => t.id === activeTournamentId.value),
    set: (value) => {
      const index = tournaments.value.findIndex(t => t.id === value?.id);

      if (index > -1 && value) {
        tournaments.value[index] = value;
      }
    },
  });

  const nonCollectionTournaments = computed(() => tournaments.value.filter(t => !t.collectionId));

  function snapshotTournament(tournament: Tournament) {
    snapshots.value[tournament.id] = clone(tournament);
  }

  function pushTournament(tournament: Tournament) {
    tournaments.value.push(tournament);
    snapshotTournament(tournament);
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

  function getTournament(id: Tournament['id'] | null): Tournament {
    const tournament = tournaments.value.find(i => i.id === id);

    if (!tournament) throw new Error('Tournament not found');

    return tournament;
  }

  function isDirty(tournament: Tournament) {
    const snapshot = snapshots.value[tournament.id];
    return snapshot && JSON.stringify(snapshot) !== JSON.stringify(tournament);
  }

  function updateTimestamps(id: Tournament['id']) {
    const tournament = getTournament(id);

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
      name: appendNumericSuffix(activeTournament.value.name, tournaments.value),
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    activeTournamentId.value = id;
  }

  function deleteActiveTournament() {
    if (!activeTournament.value) return;

    const index = tournaments.value.findIndex(i => i.id === activeTournament.value?.id);

    if (index === -1) return;

    delete snapshots.value[activeTournament.value.id];
    tournaments.value.splice(index, 1);
    activeTournamentId.value = tournaments.value[index]?.id ?? tournaments.value[tournaments.value.length - 1]?.id;
  }

  function addStage(form: StageForm) {
    if (!activeTournament.value) return;

    activeTournament.value.stages.push(newTournamentStage(form, activeTournament.value.stages));
  }

  return {
    tournaments,
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
