<template>
  <AppModal
    v-model:is-open="modalIsOpen"
    v-model:is-side-panel-open="isSidePanelOpen"
    title="Editar equipes"
    size="fullscreen"
    :submit-button-label="submitButton.label"
    :submit-button-disabled="submitButton.disabled"
    @open="onOpenModal"
    @submit="submitButton.onClick"
  >
    <template #trigger="{ openModal }">
      <slot :open-modal="openModal" />
    </template>
    <template #side-panel>
      <StandingsPanel
        :selected-teams="selectedTeams"
        :initial-tournament-id="tournamentStore.activeTournamentId"
        @select-team="onSelectTeam"
      />
    </template>
    <template #default="slotProps">
      <DrawProcedure
        v-if="seedingDraw.isStepActive.value.PROCEDURE"
        :seeding-draw="seedingDraw"
      />
      <div
        v-else
        class="flex-1 @container/groups"
      >
        <div class="flex gap-1 mb-2 relative justify-between @min-[56rem]/groups:justify-center">
          <TeamSearchInput
            ref="team-search"
            :stage-id="stage.id"
            :selected-teams="selectedTeams"
            @select="onSelectTeam"
          />
          <div class="flex gap-0.75 right-0 absolute">
            <StageSeedingRandomButton
              v-model="form.groups"
              :team-options="teamSearchInput?.teamOptions"
            />
            <StageSeedingShuffleButton v-model="form.groups" />
            <StageSeedingResetButton v-model="form.groups" />
            <StageSeedingOpenPanelButton
              v-show="!isSidePanelOpen"
              :aria-controls="slotProps.sidePanelId"
              :aria-expanded="isSidePanelOpen"
              @click="slotProps.toggleSidePanel"
            />
          </div>
        </div>
        <AppTablist
          v-model:active-tab-index="activeTabIndex"
          class="mb-1.5"
        >
          <AppTab
            class="basis-1/5"
            label="Adicionar manualmente"
          />
          <AppTab
            class="basis-1/5"
            label="Atribuir por sorteio"
          />
          <template #tabpanels>
            <StageSeedingModalManualTab v-model:form="form" />
            <StageSeedingModalDrawTab
              v-model:draw-pots="seedingDraw.pots.value"
              :form-has-empty-slots="formHasEmptySlots"
              :seeding-draw="seedingDraw"
            />
          </template>
        </AppTablist>
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import { newStageSeedingForm } from '~/helpers/stage-seeding';

enum ModalTab {
  MANUAL = 0,
  DRAW = 1,
}

interface StageTeamsProps {
  stage: TournamentStage;
  allowEmptySlots?: boolean;
}

const props = withDefaults(defineProps<StageTeamsProps>(), {
  allowEmptySlots: true,
});

const tournamentStore = useTournamentStore();
const stageStore = useStageStore();

const modalIsOpen = defineModel<boolean>('is-open');

const teamSearchInput = useTemplateRef('team-search');

const isSidePanelOpen = ref(false);
const activeTabIndex = ref(ModalTab.MANUAL);
const form = ref(newStageSeedingForm());

const selectedTeams = computed(() => (
  form.value.groups.flatMap(i => i.teams.filter(team => team !== null))
));

const seedingDraw = useSeedingDraw(selectedTeams, props.stage);

const formHasEmptySlots = computed(() => (
  selectedTeams.value.length < form.value.groups.reduce((acc, i) => acc + i.teams.length, 0)
));

const submitButton = computed(() => {
  if (activeTabIndex.value === ModalTab.MANUAL) {
    return {
      label: 'Salvar',
      disabled: !props.allowEmptySlots && formHasEmptySlots.value,
      onClick: updateTeams,
    };
  }

  if (seedingDraw.isStepActive.value.PROCEDURE) {
    return {
      label: 'Concluir',
      disabled: !seedingDraw.isProcedureStepCompleted.value,
      onClick: onDrawComplete,
    };
  }

  return {
    label: 'Continuar',
    disabled: formHasEmptySlots.value || !seedingDraw.isPotsStepCompleted.value,
    onClick: () => {
      isSidePanelOpen.value = false;
      seedingDraw.nextStep();
    },
  };
});

function onOpenModal() {
  teamSearchInput.value?.reset();
  seedingDraw.reset();
  form.value = newStageSeedingForm(props.stage);
}

function onSelectTeam(team: Team) {
  const group = form.value.groups.find(i => i.teams.includes(null));

  if (!group) return;

  const slotIndex = group.teams.findIndex(slot => slot === null);

  group.teams[slotIndex] = team.id;
}

function updateTeams() {
  stageStore.updateActiveStageTeams(form.value);
  modalIsOpen.value = false;
}

function onDrawComplete() {
  form.value.groups = Object.values(seedingDraw.procedureForm.value.groups);
  seedingDraw.reset();
  activeTabIndex.value = ModalTab.MANUAL;
}
</script>
