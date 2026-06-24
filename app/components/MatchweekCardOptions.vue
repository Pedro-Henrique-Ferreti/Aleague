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
      label="Simular uma vez"
      :icon="IconDeviceGamepad2"
      @click="matchweekCardStore.simulateMatchweek"
    />
    <AppMenuItem
      label="Simular tudo"
      :icon="IconPlayerTrackNext"
      @click="showSimulationModal = true"
    />
    <AppMenuItem
      label="Reiniciar rodadas"
      :icon="IconRefresh"
      @click="showResetMatchweeksModal = true"
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
  <AppDialog
    v-model:is-open="showSimulationModal"
    title="Simular rodadas"
    message="Você deseja simular os resultados para todas as rodadas? Resultados já existentes serão apagados."
    @confirm="onSimulateMatchweeks"
  />
  <AppDialog
    v-model:is-open="showResetMatchweeksModal"
    type="delete"
    title="Reiniciar rodadas"
    message="Você deseja reiniciar os resultados para todas as rodadas? Essa ação não poderá ser desfeita."
    @confirm="onResetMatchweeks"
  />
</template>

<script lang="ts" setup>
import { IconClockEdit, IconDeviceGamepad2, IconDotsVertical, IconPlayerTrackNext, IconRefresh, IconTrash } from '@tabler/icons-vue';

const stageStore = useStageStore();
const matchweekCardStore = useMatchweekCardStore();

const showDeleteMatchweeksDialog = ref(false);
const showSimulationModal = ref(false);
const showResetMatchweeksModal = ref(false);

function onDeleteMatchweeks() {
  stageStore.deleteGroupStageMatchweeks();
  showDeleteMatchweeksDialog.value = false;
}

function onSimulateMatchweeks() {
  showSimulationModal.value = false;
  matchweekCardStore.simulateAllMatchweeks();
}

function onResetMatchweeks() {
  showResetMatchweeksModal.value = false;
  matchweekCardStore.resetAllMatchweeks();
}
</script>
