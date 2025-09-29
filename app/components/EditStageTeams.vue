<template>
  <AppModal
    title="Editar equipes"
    size="xl"
    @open="onOpenModal"
  >
    <template #trigger="{ open }">
      <AppButton
        class="btn-primary btn-soft"
        label="Equipes"
        :class="$attrs.class"
        :icon-left="IconUsersGroup"
        @click="open"
      />
    </template>
    <div class="flex gap-1 mb-2 justify-center relative">
      <EditStageTeamsInput
        :selected-teams="selectedTeams"
        @select="onSelectTeam"
      />
      <div class="absolute flex gap-0.75 right-2">
        <div class="tooltip" data-tip="Preencher participantes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconWand"
          />
        </div>
        <div class="tooltip" data-tip="Embaralhar equipes">
          <AppButton
            class="btn-square btn-accent btn-soft"
            :icon-left="IconArrowsShuffle"
            @click="shuffleTeams"
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
        <div class="card-body p-1 grid gap-0.5">
          <div class="badge badge-secondary badge-soft absolute top-0 left-1/2 -translate-1/2">
            Grupo {{ group.order }}
          </div>
          <EditStageTeamsSlot
            v-for="team, index in group.teams"
            :key="index"
            :team="team"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
interface FormStageGroup {
  order: number;
  teams: StandingsEntry['team'][];
}
</script>

<script lang="ts" setup>
import { IconArrowsShuffle, IconUsersGroup, IconWand } from '@tabler/icons-vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  stage: TournamentGroupsStage;
}>();

// Form
const form = ref<{ groups: FormStageGroup[] }>({
  groups: [],
});

function onOpenModal() {
  form.value.groups = props.stage.groups.map((group) => ({
    order: group.order,
    teams: group.standings.map((entry) => entry.team),
  }));
}

// Team selection
const selectedTeams = computed(() => (
  form.value.groups.flatMap((i) => i.teams.filter((team) => team !== null)).map((t) => t.id)
));

function onSelectTeam(team: Team) {
  const group = form.value.groups.find((i) => i.teams.includes(null));

  if (!group) return;

  const slotIndex = group.teams.findIndex((slot) => slot === null);

  group.teams[slotIndex] = team;
}

// Shuffle teams
function shuffleTeams() {
  const teams = form.value.groups.flatMap((group) => group.teams);

  teams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < form.value.groups.length; i += 1) {
    form.value.groups[i]!.teams = teams.splice(0, form.value.groups[i]!.teams.length);
  }
}
</script>
