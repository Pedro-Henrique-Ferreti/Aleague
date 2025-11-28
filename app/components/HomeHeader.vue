<template>
  <template v-if="tournamentStore.activeTournamentId">
    <AppMenu
      class="btn-primary btn-outline"
      label="Campeonato"
      :icon="IconBallFootball"
      :items="menuItems"
    />
  </template>
  <ImportTournamentButton />
  <TournamentFormModal
    v-if="tournamentStore.activeTournament"
    v-model:is-open="tournamentModalIsOpen"
    :key="tournamentStore.activeTournament.id"
    :tournament="tournamentStore.activeTournament"
    :submit-fn="(form) => tournamentStore.updateTournament(tournamentStore.activeTournament!.id, form)"
  />
</template>

<script lang="ts" setup>
import { IconCopy, IconEdit, IconFileArrowRight, IconBallFootball } from '@tabler/icons-vue';
import type { MenuItem } from '~/components/AppMenu.vue';

const tournamentStore = useTournamentStore();

// Tournament modal
const tournamentModalIsOpen = ref(false);

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Editar',
    icon: IconEdit,
    onClick: () => tournamentModalIsOpen.value = true,
  },
  {
    label: 'Duplicar',
    icon: IconCopy,
    onClick: () => tournamentStore.duplicateTournament(tournamentStore.activeTournamentId!),
  },
  {
    label: 'Exportar',
    icon: IconFileArrowRight,
    onClick: () => tournamentStore.exportTournament(tournamentStore.activeTournamentId!),
  },
]));
</script>
