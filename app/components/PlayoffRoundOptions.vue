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
    <AppMenuItem
      label="Simular partidas"
      :icon="IconPlayerPlay"
      @click="showSimulateMatchesDialog = true"
    />
    <AppMenuItem
      label="Reiniciar partidas"
      :icon="IconRefresh"
      @click="showResetMatchesModal = true"
    />
    <AppMenuItem
      label="Sortear partidas"
      :icon="IconTournament"
      @click="showPlayoffRoundDrawModal = true"
    />
    <PlayoffSlotMenuLegOption
      :legs-count="round.slots.some(slot => slot.legs.length !== 2) ? 1 : 2"
      @add-second-leg="onAddSecondLegs"
      @remove-second-leg="onRemoveAllSecondLegs"
    />
  </AppMenu>
  <PlayoffRoundModal
    v-model:is-open="showRenameModal"
    v-model:round="round"
  />
  <SimulateMatchesDialog
    v-model:is-open="showSimulateMatchesDialog"
    v-model:preserve-score="preserveDecidedSlots"
    title="Simular partidas"
    message="Você deseja simular os resultados de todas as partidas?"
    @confirm="onSimulateMatches"
  />
  <AppDialog
    v-model:is-open="showResetMatchesModal"
    type="delete"
    title="Reiniciar partidas"
    message="Você deseja reiniciar os resultados para todas as partidas? Essa ação não poderá ser desfeita."
    @confirm="onResetMatches"
  />
  <PlayoffRoundDrawModal
    v-model:is-open="showPlayoffRoundDrawModal"
    v-model:round="round"
  />
</template>

<script lang="ts" setup>
import { IconDotsVertical, IconPencil, IconPlayerPlay, IconRefresh, IconTournament } from '@tabler/icons-vue';
import { resetMatchScore } from '~/helpers/match-score';
import { addSecondLegToSlot, simulatePlayoffRoundSlotScore } from '~/helpers/playoff-slot';

const round = defineModel<PlayoffRound>({ required: true });

const showRenameModal = ref(false);
const showSimulateMatchesDialog = ref(false);
const showResetMatchesModal = ref(false);
const showPlayoffRoundDrawModal = ref(false);

const preserveDecidedSlots = ref(false);

function onSimulateMatches() {
  for (const slot of round.value.slots) {
    simulatePlayoffRoundSlotScore(slot, preserveDecidedSlots.value);
  }

  showSimulateMatchesDialog.value = false;
}

function onResetMatches() {
  for (const slot of round.value.slots) {
    slot.legs.forEach(resetMatchScore);
  }

  showResetMatchesModal.value = false;
}

function onAddSecondLegs() {
  for (const slot of round.value.slots) {
    addSecondLegToSlot(slot);
  }
}

function onRemoveAllSecondLegs() {
  for (const slot of round.value.slots) {
    slot.legs.pop();
  }
}
</script>
