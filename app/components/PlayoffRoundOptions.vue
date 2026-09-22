<template>
  <AppMenu
    tooltip="Mais opções"
    class="btn-square btn-sm btn-ghost"
    aria-label="Opções da rodada"
    dropdown-class="dropdown-end"
    :icon-left="IconDotsVertical"
    :icon-right="false"
  >
    <AppMenuItem
      label="Renomear"
      :icon="IconPencil"
      @click="showRenameModal = true"
    />
  </AppMenu>
  <PlayoffRoundModal
    v-model:is-open="showRenameModal"
    v-model:round="round"
  />
</template>

<script lang="ts" setup>
import { IconDotsVertical, IconPencil } from '@tabler/icons-vue';

const round = defineModel<PlayoffRound>({ required: true });
  
const showRenameModal = ref(false);
</script>
