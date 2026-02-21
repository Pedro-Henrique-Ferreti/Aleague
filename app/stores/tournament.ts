import { defineStore } from 'pinia';
import { appendNumericSuffix, getBaseFileId, getTimestamp } from '~/helpers/file';
import { newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const tournaments = ref<Tournament[]>([]);
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

  function createTournament(payload: TournamentForm) {
    const id = getBaseFileId();
    const timestamp = getTimestamp();

    tournaments.value.push({
      ...payload,
      id: getBaseFileId(),
      collectionId: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      stages: [],
    } satisfies Tournament);

    activeTournamentId.value = id;
  }

  function getTournament(id: Tournament['id'] | null): Tournament {
    const tournament = tournaments.value.find(i => i.id === id);

    if (!tournament) throw new Error('Tournament not found');

    return tournament;
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

    tournaments.value.push({
      ...activeTournament.value,
      id,
      name: appendNumericSuffix(activeTournament.value.name, tournaments.value),
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    activeTournamentId.value = id;
  }

  function deleteActiveTournament() {
    const index = tournaments.value.findIndex(i => i.id === activeTournamentId.value);

    if (index === -1) return;

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
    getTournament,
    updateActiveTournament,
    duplicateActiveTournament,
    deleteActiveTournament,
    addStage,
  };
});
