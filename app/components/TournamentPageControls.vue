<template>
  <div class="flex justify-end gap-1">
    <TournamentStageModal />
    <TournamentStageModal :stage="activeStage" />
    <AppMenu
      class="btn-primary btn-soft"
      dropdown-class="dropdown-end"
      label="Fase"
      :icon="IconTournament"
      :items="menuItems"
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
import { IconTournament, IconTrash, IconUsersGroup } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const props = defineProps<{
  activeStage: TournamentStage;
}>();

const allowEmptySlots = computed(() => (
  props.activeStage?.type === StageType.GROUPS && props.activeStage.matchweeks.length === 0
));

// Edit teams modal
const editTeamModalIsOpen = ref(false);

// Delete stage
const showDeleteStageDialog = ref(false);

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
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
