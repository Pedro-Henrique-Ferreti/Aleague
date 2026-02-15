<template>
  <AppMenu
    label="Criar"
    :class="['btn-primary', $attrs.class]"
    :icon-left="IconPlus"
    :icon-right="false"
    :dropdown-class="dropdownClass"
  >
    <AppMenuItem
      label="Coleção"
      :icon="IconFolders"
      @click="collectionModalIsOpen = true"
    />
    <AppMenuItem
      label="Campeonato"
      :icon="IconBallFootball"
      @click="tournamentModalIsOpen = true"
    />
  </AppMenu>
  <TournamentFormModal
    v-model:is-open="tournamentModalIsOpen"
    :submit-fn="createTournament"
  />
  <CollectionFormModal v-model:is-open="collectionModalIsOpen" />
</template>

<script lang="ts" setup>
import type { AppMenuProps } from './AppMenu.vue';
import { IconBallFootball, IconFolders, IconPlus } from '@tabler/icons-vue';

defineProps<{
  dropdownClass?: AppMenuProps['dropdownClass'];
}>();

const tournamentStore = useTournamentStore();

// Tournament modal
const tournamentModalIsOpen = ref(false);

function createTournament(form: TournamentForm) {
  const tournament = tournamentStore.createTournament(form);
  tournamentStore.activeTournamentId = tournament.id;
}

// Collection modal
const collectionModalIsOpen = ref(false);
</script>
