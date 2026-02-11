<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    :title="isEditingForm ? 'Editar fase' : 'Adicionar fase'"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <AppInput
      v-model="form.name"
      label="Nome"
    />
    <AppFieldset label="Formato">
      <div class="flex gap-1">
        <AppRadio
          v-model="form.type"
          name="type"
          label="Grupos"
          :value="StageType.GROUPS"
          :disabled="isEditingForm"
        />
        <AppRadio
          v-model="form.type"
          name="type"
          label="Eliminatórias"
          :value="StageType.PLAYOFFS"
          :disabled="isEditingForm"
        />
      </div>
    </AppFieldset>
    <div class="divider" />
    <TournamentStageModalGroupFields
      v-if="form.type === StageType.GROUPS"
      v-model:format="form.format"
      v-model:groups="form.groups"
      v-model:teams-per-group="form.teamsPerGroup"
      v-model:group-round-robins="form.groupRoundRobins"
      :disabled="isEditingForm"
    />
    <TournamentStageModalPlayoffsFields
      v-else
      v-model:teams="form.teams"
      v-model:playoff-rounds="form.playoffRounds"
      :disabled="isEditingForm"
      :max-playoff-rounds="maxPlayoffRounds"
    />
  </AppModal>
</template>

<script setup lang="ts">
const DEFAULT_GROUPS_STAGE_NAME = 'Fase de Liga';
const DEFAULT_PLAYOFFS_STAGE_NAME = 'Playoffs';
const { MIN_TEAMS, MIN_GROUPS, MIN_TEAMS_PER_GROUP, MIN_ROUNDS } = StageConstants;

const tournamentStore = useTournamentStore();

const props = defineProps<{ stage?: TournamentStage }>();
const modalIsOpen = defineModel<boolean>('is-open');

const newForm = (): TournamentStageForm => ({
  name: props.stage?.name ?? DEFAULT_GROUPS_STAGE_NAME,
  type: props.stage?.type ?? StageType.GROUPS,
  format: (
    props.stage?.type === StageType.GROUPS ? props.stage.format : TournamentGroupFormat.ROUND_ROBIN
  ),
  teams: (
    props.stage?.type === StageType.PLAYOFFS ? props.stage.rounds[0].slots.length * 2 : MIN_TEAMS
  ),
  groups: (
    props.stage?.type === StageType.GROUPS ? props.stage.groups.length : MIN_GROUPS
  ),
  teamsPerGroup: (
    props.stage?.type === StageType.GROUPS ? props.stage?.groups[0]?.standings.length || MIN_TEAMS_PER_GROUP : MIN_TEAMS_PER_GROUP
  ),
  groupRoundRobins: (
    props.stage?.type === StageType.GROUPS ? props.stage.roundRobins : MIN_ROUNDS
  ),
  playoffRounds: (
    props.stage?.type === StageType.PLAYOFFS ? props.stage.rounds.length : MIN_ROUNDS
  ),
});

const form = ref(newForm());

const isEditingForm = ref(false);

watch(() => form.value.type, () => {
  form.value.name = (
    form.value.type === StageType.GROUPS ? DEFAULT_GROUPS_STAGE_NAME : DEFAULT_PLAYOFFS_STAGE_NAME
  );
})

// Max allowed number of playoff rounds
const maxPlayoffRounds = computed(() => {
  let teams = form.value.teams;
  let count = 0;

  while (teams % 2 === 0) {
    teams /= 2;
    count += 1;
  }

  return count;
});

watch(() => maxPlayoffRounds.value, () => {
  if (form.value.playoffRounds > maxPlayoffRounds.value) {
    form.value.playoffRounds = maxPlayoffRounds.value;
  }
});

// Submit form
const submitIsDisabled = computed(() => !form.value.name);

function submitForm() {
  if (isEditingForm.value) {
    tournamentStore.editStage({
      id: tournamentStore.activeTournamentId!,
      stageId: props.stage!.id,
      stageForm: form.value,
    });
  } else {
    tournamentStore.addStage(tournamentStore.activeTournamentId!, form.value);
  }

  modalIsOpen.value = false;
}

function onOpenModal() {
  form.value = newForm();
  isEditingForm.value = !!props.stage;
}
</script>
