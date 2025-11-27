<template>
  <AppMenu
    label="Criar"
    :class="['btn-primary btn-outline', $attrs.class]"
    :icon="IconPlus"
    :items="menuItems"
    :icon-right="false"
    :dropdown-class="dropdownClass"
  />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :submit-fn="submitTournamentForm"
  />
</template>

<script lang="ts" setup>
import { IconFolders, IconPlus, IconBallFootball } from '@tabler/icons-vue';
import type { AppMenuProps, MenuItem } from './AppMenu.vue';

const tournamentStore = useTournamentStore();

defineProps<{
  dropdownClass?: AppMenuProps['dropdownClass'];
}>();

// Tournament modal
const tournamentModalIsOpen = ref(false);

function submitTournamentForm(form: TournamentForm) {
  const tournament = tournamentStore.createTournament(form);
  
  tournamentStore.activeTournamentId = tournament.id;
}

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Coleção',
    icon: IconFolders,
  },
  {
    label: 'Campeonato',
    icon: IconBallFootball,
    onClick: () => tournamentModalIsOpen.value = true,
  },
]));
</script>
