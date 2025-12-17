<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Editar equipes"
    size="xl"
    :submit-button-disabled="submitButtonDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ open }">
      <slot :open="open" />
    </template>
    <div class="flex gap-1 mb-2 justify-center relative">
      <StageTeamsInput
        ref="teams-input"
        :stage-id="stage.id"
        :selected-teams="selectedTeams"
        @select="onSelectTeam"
      />
      <div class="absolute flex gap-0.75 right-0">
        <StageTeamsImportButton
          v-model="form.groups"
          :selected-teams="selectedTeams"
        />
        <StageTeamsFillButton
          v-model="form.groups"
          :team-options="teamsInputRef?.teamOptions"
        />
        <StageTeamsShuffleButton v-model="form.groups" />
        <StageTeamsResetButton v-model="form.groups" />
      </div>
    </div>
    <AppAlert
      v-if="!teamsAreEvenlyDistributed"
      class="mb-2"
      type="error"
      soft
      message="Todos os grupos devem conter o mesmo número de equipes."
      :icon="IconInfoCircle"
    />
    <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
      <StageTeamsGroup
        v-for="group, index in form.groups"
        v-model:teams="form.groups[index]!.teams"
        :group="group"
        :stage-type="stage.type"
        :key="group.order"
        :is-invalid="group.teams.length !== teamsPerGroup"
      />
    </div>
  </AppModal>
</template>

<script lang="ts">
interface Props {
  stage: TournamentStage;
  allowEmptySlots?: boolean;
}

export interface StageTeamsFormGroup {
  order: number;
  teams: StandingsEntry['team'][];
}

export interface StageTeamsForm {
  groups: StageTeamsFormGroup[];
}
</script>

<script lang="ts" setup>
import { IconInfoCircle } from '@tabler/icons-vue';

const { updateStageTeams, activeTournamentId: tournamentId } = useTournamentStore();

const props = withDefaults(defineProps<Props>(), {
  allowEmptySlots: true,
});

const modalIsOpen = defineModel<boolean>('is-open');

const teamsInputRef = useTemplateRef('teams-input');

// Form
const form = ref<StageTeamsForm>({
  groups: [],
});

const teamsPerGroup = ref(0);

// Modal
function onOpenModal() {
  if (props.stage.type === StageType.GROUPS) {
    form.value.groups = props.stage.groups.map((group) => ({
      order: group.order,
      teams: group.standings.map((entry) => entry.team),
    }));
  } else {
    form.value.groups = props.stage.rounds[0]!.slots.map(({ legs: [match] }, index) => ({
      order: index + 1,
      teams: [match.homeTeam.id, match.awayTeam.id],
    }));
  }

  teamsPerGroup.value = form.value.groups[0]!.teams.length;
}

// Team selection
const selectedTeams = computed(() => (
  form.value.groups.flatMap((i) => i.teams).filter((team) => team !== null)
));

function onSelectTeam(team: Team) {
  const group = form.value.groups.find((i) => i.teams.includes(null));

  if (!group) return;

  const slotIndex = group.teams.findIndex((slot) => slot === null);

  group.teams[slotIndex] = team.id;
}

// Form validation
const teamsAreEvenlyDistributed = computed(() => (
  form.value.groups.every((g) => g.teams.length === teamsPerGroup.value)
));

// Submit form
const submitButtonDisabled = computed(() => {
  const hasEmptySlots = form.value.groups.some((g) => g.teams.includes(null));

  return (!props.allowEmptySlots && hasEmptySlots) || !teamsAreEvenlyDistributed.value;
});

function submitForm() {
  updateStageTeams({
    id: tournamentId!,
    stageId: props.stage.id,
    form: form.value.groups,
  });

  modalIsOpen.value = false;
}
</script>
