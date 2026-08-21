<template>
  <AppMenu
    label="Criar"
    :class="['btn-primary', $attrs.class]"
    :icon-left="IconPlus"
    :icon-right="false"
    :dropdown-class="dropdownClass"
  >
    <AppMenuItem
      label="Campeonato"
      :icon="IconFileDescription"
      @click="tournamentModalIsOpen = true"
    />
    <AppMenuItem
      label="Coleção"
      :icon="IconFolder"
      @click="collectionModalIsOpen = true"
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
import { IconFileDescription, IconFolder, IconPlus } from '@tabler/icons-vue';

defineProps<{
  dropdownClass?: AppMenuProps['dropdownClass'];
}>();

const { createTournament } = useTournamentStore();

const tournamentModalIsOpen = ref(false);
const collectionModalIsOpen = ref(false);
</script>
