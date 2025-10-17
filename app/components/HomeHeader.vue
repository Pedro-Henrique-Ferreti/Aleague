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
    v-if="tournamentStore.activeTournament"
    ref="tournamentModalRef"
    :key="tournamentStore.activeTournament.id"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="(form) => tournamentStore.updateTournament(tournamentStore.activeTournament!.id, form)"
  />
</template>

<script lang="ts" setup>
import { IconCopy, IconEdit, IconFileArrowRight, IconSettings } from '@tabler/icons-vue';
import type { MenuItem } from '~/components/AppMenu.vue';

const tournamentStore = useTournamentStore();

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
    label: 'Duplicar',
    icon: IconCopy,
    onClick: () => {
      tournamentStore.duplicateTournament(tournamentStore.activeTournamentId!);
    },
  },
  {
    label: 'Exportar',
    icon: IconFileArrowRight,
    onClick: () => tournamentStore.exportTournament(tournamentStore.activeTournamentId!),
  },
]));
</script>
