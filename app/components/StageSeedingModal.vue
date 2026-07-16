<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    title="Editar equipes"
    size="xl"
    :submit-button-disabled="submitButtonDisabled"
    @open="onOpenModal"
    @submit="submitForm"
  >
    <template #trigger="{ openModal }">
      <slot :open-modal="openModal" />
    </template>
    <div class="flex gap-1">
      <div class="flex-1">
        <div
          class="flex gap-1 mb-2 relative"
          :class="[standingsPanelIsOpen ? 'justify-between' : 'justify-center']"
        >
          <StageTeamsInput
            ref="teams-input"
            :stage-id="stage.id"
            :selected-teams="selectedTeams"
            @select="onSelectTeam"
          />
          <div
            class="flex gap-0.75 right-0"
            :class="{ absolute: !standingsPanelIsOpen }"
          >
            <StageSeedingImportButton
              v-model="form.groups"
              :selected-teams="selectedTeams"
            />
            <StageSeedingRandomButton
              v-model="form.groups"
              :team-options="teamsInputRef?.teamOptions"
            />
            <StageSeedingShuffleButton v-model="form.groups" />
            <StageSeedingResetButton v-model="form.groups" />
            <AppTooltip
              v-if="!standingsPanelIsOpen"
              label="Abrir painel de classificação"
              class="tooltip-left"
            >
              <AppButton
                class="btn-square btn-soft"
                aria-label="Abrir painel de classificação"
                :icon-left="IconLayoutSidebarRightExpand"
                @click="standingsPanelIsOpen = true"
              />
            </AppTooltip>
          </div>
        </div>
        <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
          <StageSeedingCard
            v-for="group, index in form.groups"
            v-model="form.groups[index]!"
            :key="group.order"
            :stage-type="stage.type"
          />
        </div>
      </div>
      <StandingsPanel
        v-if="standingsPanelIsOpen"
        :selected-teams="selectedTeams"
        @select-team="onSelectTeam"
        @close-panel="standingsPanelIsOpen = false"
      />
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconLayoutSidebarRightExpand } from '@tabler/icons-vue';

interface StageTeamsProps {
  stage: TournamentStage;
  allowEmptySlots?: boolean;
}

const props = withDefaults(defineProps<StageTeamsProps>(), {
  allowEmptySlots: true,
});

const stageStore = useStageStore();

const modalIsOpen = defineModel<boolean>('is-open');

const teamsInputRef = useTemplateRef('teams-input');

const standingsPanelIsOpen = ref(false);
const form = ref<StageTeamsForm>({
  groups: [],
});

function onOpenModal() {
  teamsInputRef.value?.reset();
  standingsPanelIsOpen.value = false;

  if (props.stage.type === StageType.GROUP) {
    form.value.groups = props.stage.groups.map(group => ({
      order: group.order,
      teams: group.standings.map(entry => entry.team),
    }));
  } else {
    form.value.groups = props.stage.rounds[0]!.slots.map(({ legs: [match] }, index) => ({
      order: index + 1,
      teams: [match.homeTeam.id, match.awayTeam.id],
    }));
  }
}

const selectedTeams = computed(() => (
  form.value.groups.flatMap(i => i.teams.filter(team => team !== null))
));

function onSelectTeam(team: Team) {
  const group = form.value.groups.find(i => i.teams.includes(null));

  if (!group) return;

  const slotIndex = group.teams.findIndex(slot => slot === null);

  group.teams[slotIndex] = team.id;
}

const submitButtonDisabled = computed(() => (
  !props.allowEmptySlots
  && selectedTeams.value.length < form.value.groups.reduce((acc, i) => acc + i.teams.length, 0)
));

function submitForm() {
  stageStore.updateActiveStageTeams(form.value);
  modalIsOpen.value = false;
}
</script>
