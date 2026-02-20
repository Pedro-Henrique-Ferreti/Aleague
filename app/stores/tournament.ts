import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';
import { newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', () => {
  const tournaments = ref<Tournament[]>([]);
  const activeTournamentId = ref<Tournament['id'] | null>(null);

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
    const timestamp = getTimestamp();
    const tournament: Tournament = {
      ...payload,
      id: getBaseFileId(),
      collectionId: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      stages: [],
    };

    tournaments.value.push(tournament);

    return tournament;
  }

  function getTournament(id: Tournament['id'] | null): Tournament {
    const tournament = tournaments.value.find(i => i.id === id);

    if (!tournament) throw new Error('Tournament not found');

    return tournament;
  }

  function getStage(id: Tournament['id'], stageId: TournamentStage['id']): TournamentStage {
    const stage = getTournament(id).stages.find(i => i.id === stageId);

    if (!stage) throw new Error('Stage not found');

    return stage;
  }

  function updateTournament(id: Tournament['id'] | null, payload: TournamentForm) {
    const index = tournaments.value.findIndex(i => i.id === id);

    if (index === -1) throw new Error('Tournament not found');

    tournaments.value[index] = {
      ...tournaments.value[index] as Tournament,
      ...payload,
    };
  }

  function duplicateTournament(id: Tournament['id']) {
    const parse = (str: string) => str.replace(/\(\d+\)/, '').trim();
    const tournament = clone(getTournament(id));
    const newId = getBaseFileId();
    const name = parse(tournament.name);
    const number = tournaments.value.filter(t => parse(t.name).startsWith(name)).length + 1;
    const timestamp = getTimestamp();

    tournaments.value.push({
      ...tournament,
      id: newId,
      name: `${name} (${number})`,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    activeTournamentId.value = newId;
  }

  function deleteTournament(id: Tournament['id']) {
    const index = tournaments.value.findIndex(i => i.id === id);

    tournaments.value.splice(index, 1);
    activeTournamentId.value = tournaments.value[index]?.id || (tournaments.value[tournaments.value.length - 1]?.id || null);
  }

  function addStage(id: Tournament['id'], stageForm: StageForm) {
    const tournament = getTournament(id);
    tournament.stages.push(newTournamentStage(stageForm, tournament.stages));
  }

  function editStage(payload: EditStageStorePayload) {
    const stage = getStage(payload.id, payload.stageId);
    stage.name = payload.stageForm.name;
  }

  function removeStage(id: Tournament['id'], stageId: TournamentStage['id']) {
    const tournament = getTournament(id);
    tournament.stages = tournament.stages.filter(stage => stage.id !== stageId);
  }

  return {
    tournaments,
    activeTournamentId,
    activeTournament,
    nonCollectionTournaments,
    createTournament,
    getTournament,
    getStage,
    updateTournament,
    duplicateTournament,
    deleteTournament,
    addStage,
    editStage,
    removeStage,
  };
});
