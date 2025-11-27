<template>
  <div class="flex justify-end gap-1">
    <AppMenu
      class="btn-primary btn-soft"
      dropdown-class="dropdown-end"
      label="Fase"
      :icon="IconTournament"
      :items="menuItems"
    />
    <TournamentStageModal
      v-model:is-open="stageModalIsOpen"
      :stage="isEditingStage ? activeStage : undefined"
    />
    <EditStageTeamsModal
      v-model:is-open="editTeamModalIsOpen"
      :allow-empty-slots="allowEmptySlots"
      :stage="activeStage"
    />
    <AppDialog
      v-model:is-open="showDeleteStageDialog"
      message="Deseja realmente excluir essa fase? Essa ação não poderá ser desfeita."
      @confirm="tournamentStore.removeStage(tournamentStore.activeTournamentId!, activeStage.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { MenuItem } from './AppMenu.vue';
import { IconEdit, IconPlus, IconTournament, IconTrash, IconUsersGroup } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const props = defineProps<{
  activeStage: TournamentStage;
}>();

// Stage modal
const isCreatingStage = ref(false);
const isEditingStage = ref(false);

const stageModalIsOpen = computed({
  get: () => isCreatingStage.value || isEditingStage.value,
  set: (value: boolean) => {
    if (!value) {
      isCreatingStage.value = false;
      isEditingStage.value = false;
    }
  },
});

// Edit teams modal
const editTeamModalIsOpen = ref(false);

const allowEmptySlots = computed(() => (
  props.activeStage?.type === StageType.GROUPS && props.activeStage.matchweeks.length === 0
));

// Delete stage
const showDeleteStageDialog = ref(false);

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Adicionar',
    icon: IconPlus,
    onClick: () => isCreatingStage.value = true,
  },
  {
    label: 'Editar',
    icon: IconEdit,
    onClick: () => isEditingStage.value = true,
  },
  {
    label: 'Equipes',
    icon: IconUsersGroup,
    onClick: () => editTeamModalIsOpen.value = true,
  },
  {
    label: 'Excluir',
    icon: IconTrash,
    color: 'error',
    onClick: () => showDeleteStageDialog.value = true,
  },
]));
</script>
