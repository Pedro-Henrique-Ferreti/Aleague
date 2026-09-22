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
</template>

<script lang="ts" setup>
import { IconDotsVertical, IconPencil, IconPlayerPlay } from '@tabler/icons-vue';
import { simulateMatchScore } from '~/helpers/match-simulation';
import { getPlayoffRoundSlotWinner } from '~/helpers/playoff-stage';

const round = defineModel<PlayoffRound>({ required: true });

const showRenameModal = ref(false);
const showSimulateMatchesModal = ref(false);

function onSimulateMatches() {
  for (const slot of round.value.slots) {
    do {
      for (const match of slot.legs) {
        const { home, away } = simulateMatchScore(match.homeTeam.id, match.awayTeam.id);
        match.homeTeam.score = home;
        match.awayTeam.score = away;
      }
    }
    while (getPlayoffRoundSlotWinner(slot) === null);
  }

  showSimulateMatchesModal.value = false;
}
</script>
