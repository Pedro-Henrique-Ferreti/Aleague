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
      @click="$emit('editKickoffs')"
    />
    <AppMenuItem
      label="Aleatorizar resultados"
      :icon="IconPencilQuestion"
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
import { IconClockEdit, IconDotsVertical, IconPencilQuestion, IconTrash } from '@tabler/icons-vue';

const emit = defineEmits<{
  editKickoffs: [];
  randomizeResults: [];
  deleteMatchweeks: [];
}>();

const showDeleteMatchweeksDialog = ref(false);

function onDeleteMatchweeks() {
  emit('deleteMatchweeks');
  showDeleteMatchweeksDialog.value = false;
}
</script>
