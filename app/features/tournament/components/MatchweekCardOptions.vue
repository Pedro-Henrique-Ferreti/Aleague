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
      :icon="IconPlayerPlay"
      @click="onSimulateMatchweekClick"
    />
    <AppMenuItem
      label="Simular tudo"
      :icon="IconPlayerTrackNext"
      @click="showSimulateAllModal = true"
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
  <SimulateMatchesDialog
    v-model:is-open="showSimulateSingleModal"
    v-model:preserve-score="preserveCompletedMatches"
    title="Simular rodada"
    message="Você deseja simular os resultados desta rodada?"
    @confirm="onSimulateMatchweek"
  />
  <SimulateMatchesDialog
    v-model:is-open="showSimulateAllModal"
    title="Simular rodadas"
    message="Você deseja simular os resultados para todas as rodadas? Resultados já existentes serão apagados."
    @confirm="onSimulateAllMatchweeks"
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
import { IconClockEdit, IconDotsVertical, IconPlayerPlay, IconPlayerTrackNext, IconRefresh, IconTrash } from '@tabler/icons-vue';

const stageStore = useStageStore();
const matchweekCardStore = useMatchweekCardStore();

const showDeleteMatchweeksDialog = ref(false);
const showSimulateSingleModal = ref(false);
const showSimulateAllModal = ref(false);
const showResetMatchweeksModal = ref(false);
const preserveCompletedMatches = ref(false);

function onDeleteMatchweeks() {
  stageStore.deleteGroupStageMatchweeks();
  showDeleteMatchweeksDialog.value = false;
}

function onSimulateMatchweek() {
  showSimulateSingleModal.value = false;
  matchweekCardStore.simulateSelectedMatchweek(preserveCompletedMatches.value);
}

function onSimulateAllMatchweeks() {
  showSimulateAllModal.value = false;
  matchweekCardStore.simulateAllMatchweeks();
}

function onResetMatchweeks() {
  showResetMatchweeksModal.value = false;
  matchweekCardStore.resetAllMatchweeks();
}

function onSimulateMatchweekClick() {
  if (matchweekCardStore.matchweekIsDirty) {
    showSimulateSingleModal.value = true;
  } else {
    matchweekCardStore.simulateSelectedMatchweek();
  }
}
</script>
