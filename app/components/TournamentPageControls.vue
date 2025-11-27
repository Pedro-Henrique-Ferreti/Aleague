<template>
  <div class="flex justify-end gap-1">
    <TournamentStageModal />
    <TournamentStageModal :stage="activeStage" />
    <EditStageTeams
      v-if="showEditTeamsModal"
      :allow-empty-slots="allowEmptySlots"
      :stage="activeStage"
    />
    <AppMenu
      class="btn-primary btn-soft"
      dropdown-class="dropdown-end"
      label="Fase"
      :icon="IconTournament"
      :items="menuItems"
    />
    <AppDialog
      v-model:is-open="showDeleteStageDialog"
      message="Deseja realmente excluir essa fase? Essa ação não poderá ser desfeita."
      @confirm="tournamentStore.removeStage(tournamentStore.activeTournamentId!, activeStage.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import { allTeamsAssigned } from '~/helpers/stage';
import type { MenuItem } from './AppMenu.vue';
import { IconTournament, IconTrash } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const props = defineProps<{
  activeStage: TournamentStage;
}>();

const showEditTeamsModal = computed(() => (
  props.activeStage?.type === StageType.PLAYOFFS || (
    props.activeStage?.type === StageType.GROUPS && allTeamsAssigned(props.activeStage)
  )
));

const allowEmptySlots = computed(() => (
  props.activeStage?.type === StageType.GROUPS && props.activeStage.matchweeks.length === 0
));

// Delete stage
const showDeleteStageDialog = ref(false);

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Excluir',
    icon: IconTrash,
    color: 'error',
    onClick: () => showDeleteStageDialog.value = true,
  },
]));
</script>
