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
      @click="showSimulateMatchesModal = true"
    />
    <AppMenuItem
      label="Reiniciar partidas"
      :icon="IconRefresh"
      @click="showResetMatchesModal = true"
    />
  </AppMenu>
  <PlayoffRoundModal
    v-model:is-open="showRenameModal"
    v-model:round="round"
  />
  <AppDialog
    v-model:is-open="showSimulateMatchesModal"
    title="Simular partidas"
    message="Você deseja simular os resultados das partidas? Resultados já existentes serão apagados."
    @confirm="onSimulateMatches"
  />
  <AppDialog
    v-model:is-open="showResetMatchesModal"
    type="delete"
    title="Reiniciar partidas"
    message="Você deseja reiniciar os resultados para todas as partidas? Essa ação não poderá ser desfeita."
    @confirm="onResetMatches"
  />
</template>

<script lang="ts" setup>
import { IconDotsVertical, IconPencil, IconPlayerPlay, IconRefresh } from '@tabler/icons-vue';
import { resetMatchScore } from '~/helpers/match-score';
import { simulatePlayoffRoundSlotScore } from '~/helpers/playoff-slot';

const round = defineModel<PlayoffRound>({ required: true });

const showRenameModal = ref(false);
const showSimulateMatchesModal = ref(false);
const showResetMatchesModal = ref(false);

function onSimulateMatches() {
  for (const slot of round.value.slots) {
    simulatePlayoffRoundSlotScore(slot);
  }

  showSimulateMatchesModal.value = false;
}

function onResetMatches() {
  for (const slot of round.value.slots) {
    slot.legs.forEach(resetMatchScore);
  }

  showResetMatchesModal.value = false;
}
</script>
