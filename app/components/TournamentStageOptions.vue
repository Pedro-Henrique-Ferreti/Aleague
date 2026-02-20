<template>
  <div class="flex justify-end gap-1">
    <AppMenu
      class="btn-primary btn-soft"
      dropdown-class="dropdown-end"
      label="Fase"
      :icon-left="IconTournament"
    >
      <AppMenuItem
        label="Adicionar"
        :icon="IconPlus"
        @click="isCreatingStage = true"
      />
      <AppMenuItem
        label="Editar"
        :icon="IconEdit"
        @click="isEditingStage = true"
      />
      <AppMenuItem
        label="Equipes"
        :icon="IconUsersGroup"
        @click="editTeamModalIsOpen = true"
      />
      <AppMenuItem
        type="error"
        label="Excluir"
        :icon="IconTrash"
        @click="showDeleteStageDialog = true"
      />
    </AppMenu>
    <StageFormModal
      v-model:is-open="stageModalIsOpen"
      :stage="isEditingStage ? activeStage : undefined"
    />
    <StageTeamsModal
      v-if="activeStage"
      v-model:is-open="editTeamModalIsOpen"
      :allow-empty-slots="allowEmptySlots"
      :stage="activeStage"
    />
    <AppDialog
      v-if="activeStage"
      v-model:is-open="showDeleteStageDialog"
      type="delete"
      title="Excluir fase"
      @confirm="tournamentStore.removeStage(tournamentStore.activeTournamentId!, activeStage.id)"
    >
      <p>Você tem certeza que deseja excluir a fase <b>{{ activeStage.name }}</b>? Essa ação não poderá ser desfeita.</p>
    </AppDialog>
  </div>
</template>

<script lang="ts" setup>
import { IconEdit, IconPlus, IconTournament, IconTrash, IconUsersGroup } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();
const { activeStage } = storeToRefs(useStageStore());

// Stage modal
const isCreatingStage = ref(false);
const isEditingStage = ref(false);

const stageModalIsOpen = computed({
  get: () => isCreatingStage.value || isEditingStage.value,
  set: (value) => {
    isCreatingStage.value = value;
    isEditingStage.value = value;
  },
});

// Edit teams modal
const editTeamModalIsOpen = ref(false);

const allowEmptySlots = computed(() => (
  activeStage.value?.type === StageType.GROUP && activeStage.value.matchweeks.length === 0
));

// Delete stage
const showDeleteStageDialog = ref(false);
</script>
