<template>
  <AppModal
    ref="modalRef"
    :title="isEditingForm ? 'Editar fase' : 'Adicionar fase'"
    :submit-button-disabled="submitIsDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-soft"
        :class="$attrs.class"
        :label="isEditingForm ? 'Editar' : 'Adicionar'"
        :icon-left="isEditingForm ? IconEdit : IconPlus"
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
          :disabled="isEditingForm"
        />
        <AppRadio
          v-model="form.type"
          name="type"
          label="Eliminatórias"
          :value="TournamentStageType.PLAYOFFS"
          :disabled="isEditingForm"
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
        :disabled="isEditingForm"
      />
      <div class="grid grid-cols-2 gap-x-1">
        <AppCounter
          v-model="form.groups"
          label="Quantidade de grupos"
          name="groups"
          :min="MIN_GROUPS"
          :max="MAX_GROUPS"
          :disabled="isEditingForm"
        />
        <AppCounter
          v-model="form.teamsPerGroup"
          label="Equipes em cada grupo"
          name="teams-per-group"
          :step="2"
          :min="MIN_TEAMS_PER_GROUP"
          :max="MAX_TEAMS_PER_GROUP"
          :disabled="isEditingForm"
        />
        <AppCounter
          v-model="form.groupRoundRobins"
          label="Turnos"
          name="rounds"
          :min="MIN_ROUNDS"
          :max="3"
          :disabled="isEditingForm"
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
          :disabled="isEditingForm"
        />
        <AppCounter
          v-model="form.playoffRounds"
          label="Número de rodadas"
          name="rounds"
          :step="1"
          :min="MIN_ROUNDS"
          :max="maxPlayoffRounds"
          :disabled="isEditingForm"
        />
        <div class="alert col-span-2 mt-1 text-xs font-semibold">
          <IconInfoCircle class="text-primary shrink-0" />
          <div class="flex flex-wrap gap-x-0.25">
            <span
              v-for="name in getPlayoffRoundNames(form.playoffRounds, form.teams)"
              class="last:[&_svg]:hidden"
              :key="name"
            >
              {{ name }}
              <IconArrowBadgeRightFilled class="inline size-1 -translate-y-px" />
            </span>
          </div>
        </div>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { IconPlus, IconEdit, IconArrowBadgeRightFilled, IconInfoCircle } from '@tabler/icons-vue';
import { getPlayoffRoundNames } from '~/helpers/playoffs';

const MIN_TEAMS = 2;
const MIN_TEAMS_PER_GROUP = 2;
const MAX_TEAMS_PER_GROUP = 32;
const MIN_ROUNDS = 1;
const MIN_GROUPS = 1;
const MAX_GROUPS = 32;

const tournamentStore = useTournamentStore();

const props = defineProps<{ stage?: TournamentStage }>();

const modalRef = useTemplateRef('modalRef');

const newForm = (): TournamentStageForm => ({
  name: props.stage?.name ?? null,
  type: props.stage?.type ?? TournamentStageType.GROUPS,
  format: (
    props.stage?.type === TournamentStageType.GROUPS ? props.stage.format : TournamentGroupFormat.ROUND_ROBIN
  ),
  teams: MIN_TEAMS,
  groups: (
    props.stage?.type === TournamentStageType.GROUPS ? props.stage.groups.length : MIN_GROUPS
  ),
  teamsPerGroup: (
    props.stage?.type === TournamentStageType.GROUPS ? props.stage?.groups[0]?.standings.length || MIN_TEAMS_PER_GROUP : MIN_TEAMS_PER_GROUP
  ),
  groupRoundRobins: (
    props.stage?.type === TournamentStageType.GROUPS ? props.stage.roundRobins : MIN_ROUNDS
  ),
  playoffRounds: MIN_ROUNDS,
});

const form = ref(newForm());

const isEditingForm = computed(() => !!props.stage);

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

  modalRef.value?.close();
}

function onOpenModal() {
  form.value = newForm();
}
</script>
