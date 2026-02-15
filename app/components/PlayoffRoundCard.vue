<template>
  <div class="flex h-full items-center">
    <div class="card card-border dropdown dropdown-hover dropdown-right p-0.75 order-1 w-full group">
      <MatchCard
        v-model:home-score="slot.legs[0].homeTeam.score"
        v-model:away-score="slot.legs[0].awayTeam.score"
        role="button"
        tabindex="0"
        layout="vertical"
        :match="slot.legs[0]"
        :show-country="tournamentStore.activeTournament?.showCountry"
        :fixture-two-home-score="slot.legs[1]?.homeTeam.score"
        :fixture-two-away-score="slot.legs[1]?.awayTeam.score"
        @update:fixture-two-home-score="slot.legs[1] ? slot.legs[1].homeTeam.score = $event as Match['homeTeam']['score'] : null"
        @update:fixture-two-away-score="slot.legs[1] ? slot.legs[1].awayTeam.score = $event as Match['awayTeam']['score'] : null"
      />
      <ul class="dropdown-content menu bg-base-100 w-14 rounded-box z-1 shadow-sm">
        <AppMenuItem
          v-if="slot.legs[0].homeTeam.id !== null && slot.legs[0].awayTeam.id !== null"
          label="Aleatorizar resultados"
          :icon="IconPencilQuestion"
          @click="randomizeScore"
        />
        <AppMenuItem
          v-if="slot.legs.length <= 1"
          type="primary"
          label="Adicionar segundo jogo"
          :icon="IconPlus"
          @click="addMatchToSlot"
        />
        <AppMenuItem
          v-else
          type="error"
          label="Excluir segundo jogo"
          :icon="IconTrash"
          @click="slot.legs.pop()"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPencilQuestion, IconPlus, IconTrash } from '@tabler/icons-vue';
import { getRandomScore, newMatch } from '~/helpers/match';

const emit = defineEmits<{
  winnerUpdated: [PlayoffRoundWinner];
}>();

const tournamentStore = useTournamentStore();

const slot = defineModel<PlayoffRound['slots'][number]>({ required: true });

function addMatchToSlot() {
  slot.value.legs.push(newMatch(slot.value.legs[0].awayTeam.id, slot.value.legs[0].homeTeam.id));
}

function randomizeScore() {
  slot.value.legs.forEach((_, index) => {
    slot.value.legs[index]!.homeTeam.score = getRandomScore();
    slot.value.legs[index]!.awayTeam.score = getRandomScore();
  });
}

const winner = computed<PlayoffRoundWinner>(() => {
  if (slot.value.legs.some(m => m.homeTeam.score === null || m.awayTeam.score === null))
    return null;

  const homeScore = slot.value.legs.reduce((sum, m) => m.homeTeam.score! + sum, 0);
  const awayScore = slot.value.legs.reduce((sum, m) => m.awayTeam.score! + sum, 0);

  if (homeScore > awayScore)
    return slot.value.legs[0].homeTeam.id;
  if (homeScore < awayScore)
    return slot.value.legs[0].awayTeam.id;
  return null;
});

watch(winner, () => emit('winnerUpdated', winner.value));
</script>
