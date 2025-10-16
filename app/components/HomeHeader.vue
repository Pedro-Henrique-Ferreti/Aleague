<template>
  <template v-if="tournamentStore.activeTournamentId">
    <CloseTournamentButton />
    <AppMenu
      class="btn-primary btn-outline"
      label="Gerenciar"
      :icon="IconSettings"
      :items="menuItems"
    />
  </template>
  <ImportTournamentButton />
  <CreateTournamentButton />
  <TournamentFormModal
    v-if="tournament"
    ref="tournamentModalRef"
    :key="tournament?.id"
    :tournament="tournament"
    :submit-fn="(form) => tournamentStore.updateTournament(tournament!.id, form)"
  />
</template>

<script lang="ts" setup>
import { IconEdit, IconFileArrowRight, IconSettings } from '@tabler/icons-vue';
import type { MenuItem } from '~/components/AppMenu.vue';

const tournamentStore = useTournamentStore();

const tournament = computed(() => (
  tournamentStore.tournaments.find((i) => i.id === tournamentStore.activeTournamentId)
));

// Modal
const tournamentModalRef = useTemplateRef('tournamentModalRef');

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Editar',
    icon: IconEdit,
    onClick: () => {
      tournamentModalRef.value?.open();
    },
  },
  {
    label: 'Exportar',
    icon: IconFileArrowRight,
    onClick: () => tournamentStore.exportTournament(tournamentStore.activeTournamentId!),
  },
]));
</script>
