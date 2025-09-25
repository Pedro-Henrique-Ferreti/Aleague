<template>
  <AppModal
    ref="modalRef"
    title="Adicionar fase"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-soft"
        :class="$attrs.class"
        label="Adicionar fase"
        :icon-left="IconPlus"
        @click="open"
      />
    </template>
    <AppInput
      v-model="form.name"
      label="Nome"
      name="name"
    />
    <AppFieldset label="Formato">
      <div class="flex gap-1">
        <AppRadio
          v-model="form.type"
          name="type"
          label="Grupos"
          :value="TournamentStageType.GROUPS"
        />
        <AppRadio
          v-model="form.type"
          name="type"
          label="Eliminatórias"
          :value="TournamentStageType.PLAYOFFS"
        />
      </div>
    </AppFieldset>
    <div class="divider" />
    <template v-if="form.type === TournamentStageType.GROUPS">
      <AppSelect
        v-model="form.format"
        class="max-w-20"
        label="Disputa de partidas"
        :options="TOURNAMENT_GROUP_FORMAT_OPTIONS"
      />
      <div class="grid grid-cols-2 gap-x-1">
        <AppCounter
          v-model="form.groups"
          label="Quantidade de grupos"
          name="groups"
          :min="MIN_GROUPS"
          :max="MAX_GROUPS"
        />
        <AppCounter
          v-model="form.teamsPerGroup"
          label="Equipes em cada grupo"
          name="teams-per-group"
          :step="2"
          :min="MIN_TEAMS_PER_GROUP"
          :max="MAX_TEAMS_PER_GROUP"
        />
        <AppCounter
          v-model="form.groupsRounds"
          label="Rodadas"
          name="rounds"
          :min="MIN_ROUNDS"
          :max="3"
        />
        <AppFieldset
          class="text-center"
          label="Total de equipes"
        >
          <span class="font-semibold text-2xl text-center">
            {{ form.teamsPerGroup * form.groups }}
          </span>
        </AppFieldset>
      </div>
    </template>
    <template v-else>
      <div class="grid grid-cols-2 gap-x-1">
        <AppCounter
          v-model="form.teams"
          label="Equipes participantes"
          name="teams"
          :step="2"
          :min="MIN_TEAMS"
        />
        <AppCounter
          v-model="form.playoffRounds"
          label="Número de rodadas"
          name="rounds"
          :step="1"
          :min="MIN_ROUNDS"
          :max="maxPlayoffRounds"
        />
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

const MIN_TEAMS = 2;
const MIN_TEAMS_PER_GROUP = 2;
const MAX_TEAMS_PER_GROUP = 32;
const MIN_ROUNDS = 1;
const MIN_GROUPS = 1;
const MAX_GROUPS = 32;

const tournamentStore = useTournamentStore();

const props = defineProps<{
  tournament: Tournament;
}>();

const modalRef = useTemplateRef('modalRef');

const newForm = (): TournamentStageForm => ({
  name: null,
  type: TournamentStageType.GROUPS,
  format: TournamentGroupFormat.ROUND_ROBIN,
  teams: MIN_TEAMS,
  groups: MIN_GROUPS,
  teamsPerGroup: MIN_TEAMS_PER_GROUP,
  groupsRounds: MIN_ROUNDS,
  playoffRounds: MIN_ROUNDS,
});

const form = ref(newForm());

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
  tournamentStore.addStage(props.tournament.id, form.value);

  modalRef.value?.close();
}

function onOpenModal() {
  form.value = newForm();
}
</script>
