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
      <EditStageTeamsInput
        ref="teamsInputRef"
        :selected-teams="selectedTeams"
        @select="onSelectTeam"
      />
      <div class="absolute flex gap-0.75 right-0">
        <div class="tooltip" data-tip="Importar participantes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            aria-label="Fill slots"
            :icon-left="IconFileArrowLeft"
            @click="importTournament"
          />
        </div>
        <div class="tooltip" data-tip="Preencher participantes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            aria-label="Fill slots"
            :icon-left="IconWand"
            @click="fillSlots"
          />
        </div>
        <div class="tooltip" data-tip="Embaralhar equipes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            aria-label="Shuffle teams"
            :icon-left="IconArrowsShuffle"
            @click="shuffleTeams"
          />
        </div>
        <div class="tooltip tooltip-left" data-tip="Remover equipes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            aria-label="Remove teams"
            :icon-left="IconRefresh"
            @click="resetSlots"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
      <div
        v-for="group in form.groups"
        class="card card-border relative"
        :key="group.order"
      >
        <div class="card-body p-1 grid gap-0.5 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
            {{ stage.type === StageType.GROUPS ? 'Grupo' : 'Partida' }} {{ group.order }}
          </div>
          <EditStageTeamsSlot
            v-for="team, index in group.teams"
            :key="index"
            :team-id="team"
            @remove="group.teams[index] = null"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
export interface FormStageGroup {
  order: number;
  teams: StandingsEntry['team'][];
}
</script>

<script lang="ts" setup>
import { IconArrowsShuffle, IconFileArrowLeft, IconRefresh, IconWand } from '@tabler/icons-vue';

const { updateStageTeams, activeTournamentId: tournamentId } = useTournamentStore();

const props = withDefaults(defineProps<{
  stage: TournamentStage;
  allowEmptySlots?: boolean;
}>(), {
  allowEmptySlots: true,
});

const modalIsOpen = defineModel<boolean>('is-open');

const teamsInputRef = useTemplateRef('teamsInputRef');

// Form
const form = ref<{ groups: FormStageGroup[] }>({
  groups: [],
});

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
}

// Team selection
const selectedTeams = computed(() => (
  form.value.groups.flatMap((i) => i.teams.filter((team) => team !== null))
));

function onSelectTeam(team: Team) {
  const group = form.value.groups.find((i) => i.teams.includes(null));

  if (!group) return;

  const slotIndex = group.teams.findIndex((slot) => slot === null);

  group.teams[slotIndex] = team.id;
}

// Shuffle teams
function shuffleTeams() {
  const teams = form.value.groups.flatMap((group) => group.teams);

  teams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < form.value.groups.length; i += 1) {
    form.value.groups[i]!.teams = teams.splice(0, form.value.groups[i]!.teams.length);
  }
}

// Fill slots
function fillSlots() {
  const options = Object.assign([], teamsInputRef.value?.teamOptions || []) as TeamDetails[];

  form.value.groups.forEach((group, index) => {
    group.teams.forEach((slot, slotIndex) => {
      if (slot !== null || options.length === 0) return;

      const [team] = options.splice(Math.floor(Math.random() * options.length), 1);

      form.value.groups[index]!.teams[slotIndex] = team?.id || null;
    });
  });
}

// Reset slots
function resetSlots() {
  form.value.groups.forEach((group, index) => {
    group.teams.forEach((_, slotIndex) => {
      form.value.groups[index]!.teams[slotIndex] = null;
    });
  });
}

// Import teams
const { start: importTournament } = useImportTournament((data: Tournament[]) => {
  const [tournament] = data;

  if (!tournament) return;

  const teams = tournament.stages.flatMap((stage) => {
    if (stage.type === StageType.GROUPS) {
      return stage.groups.flatMap((g) => g.standings.map((s) => s.team));
    }

    return stage.rounds.flatMap((r) => (
      r.slots.flatMap((s) => s.legs.flatMap((l) => [l.homeTeam.id, l.awayTeam.id]))
    ));
  });

  const uniqueTeams = Array.from(
    new Set(teams.filter((t) => !!t && !selectedTeams.value.includes(t))),
  );

  for (const group of form.value.groups) {
    for (let index in group.teams) {
      if (group.teams[index] === null) {
        group.teams[index] = uniqueTeams.shift() ?? null;
      }
    }
  }
});

// Submit form
const submitButtonDisabled = computed(() => (
  !props.allowEmptySlots
  && selectedTeams.value.length < form.value.groups.reduce((acc, i) => acc + i.teams.length, 0)
));

function submitForm() {
  updateStageTeams({
    id: tournamentId!,
    stageId: props.stage.id,
    form: form.value.groups,
  });

  modalIsOpen.value = false;
}
</script>
