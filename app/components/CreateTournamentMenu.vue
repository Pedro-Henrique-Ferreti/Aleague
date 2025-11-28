<template>
  <AppMenu
    :label="buttonLabel"
    :class="['btn-primary', $attrs.class]"
    :icon="IconPlus"
    :items="menuItems"
    :icon-right="false"
    :dropdown-class="dropdownClass"
  />
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :submit-fn="submitTournamentForm"
  />
  <CollectionFormModal
    v-model:is-open="collectionModalIsOpen"
    :submit-fn="submitCollectionForm"
  />
</template>

<script lang="ts" setup>
import { IconFolders, IconPlus, IconBallFootball } from '@tabler/icons-vue';
import type { AppMenuProps, MenuItem } from './AppMenu.vue';

const tournamentStore = useTournamentStore();

withDefaults(defineProps<{
  dropdownClass?: AppMenuProps['dropdownClass'];
  buttonLabel?: string;
}>(), {
  buttonLabel: 'Criar novo',
});

// Tournament modal
const tournamentModalIsOpen = ref(false);

function submitTournamentForm(form: TournamentForm) {
  const tournament = tournamentStore.createTournament(form);
  
  tournamentStore.activeTournamentId = tournament.id;
}

// Collection modal
const collectionModalIsOpen = ref(false);

function submitCollectionForm() {}

// Menu items
const menuItems = computed<MenuItem[]>(() => ([
  {
    label: 'Coleção',
    icon: IconFolders,
    onClick: () => collectionModalIsOpen.value = true,
  },
  {
    label: 'Campeonato',
    icon: IconBallFootball,
    onClick: () => tournamentModalIsOpen.value = true,
  },
]));
</script>
