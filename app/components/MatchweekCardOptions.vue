<template>
  <AppMenu
    tooltip="Mais opções"
    class="btn-square btn-sm btn-ghost ml-auto"
    aria-label="Opções da rodada"
    dropdown-class="dropdown-end"
    :icon-left="IconDotsVertical"
    :icon-right="false"
  >
    <AppMenuItem
      label="Editar datas"
      :icon="IconClockEdit"
      @click="matchweekCardStore.kickoffModalIsOpen = true"
    />
    <AppMenuItem
      label="Simular resultados"
      :icon="IconDeviceGamepad2"
      @click="$emit('randomizeResults')"
    />
    <AppMenuItem
      label="Excluir rodadas"
      type="error"
      :icon="IconTrash"
      @click="showDeleteMatchweeksDialog = true"
    />
  </AppMenu>
  <AppDialog
    v-model:is-open="showDeleteMatchweeksDialog"
    type="delete"
    title="Excluir rodadas"
    message="Você tem certeza que deseja excluir todas as rodadas? Essa ação não poderá ser desfeita."
    @confirm="onDeleteMatchweeks"
  />
</template>

<script lang="ts" setup>
import { IconClockEdit, IconDeviceGamepad2, IconDotsVertical, IconTrash } from '@tabler/icons-vue';

defineEmits<{
  randomizeResults: [];
}>();

const stageStore = useStageStore();
const matchweekCardStore = useMatchweekCardStore();

const showDeleteMatchweeksDialog = ref(false);

function onDeleteMatchweeks() {
  stageStore.deleteGroupMatchweeks();
  showDeleteMatchweeksDialog.value = false;
}
</script>
