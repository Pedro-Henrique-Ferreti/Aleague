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
      <div class="dropdown-content menu gap-0.5 bg-base-100 w-11 rounded-box z-1 shadow-sm">
        <AppButton
          v-if="slot.legs.length <= 1"
          class="btn-primary btn-soft btn-sm"
          label="Jogo de volta"
          :icon-left="IconPlus"
          @click="addMatchToSlot"
        />
        <AppButton
          v-else
          class="btn-error btn-soft btn-sm"
          label="Jogo de volta"
          :icon-left="IconTrash"
          @click="slot.legs.pop()"
        />
        <AppButton
          v-if="slot.legs[0].homeTeam.id !== null && slot.legs[0].awayTeam.id !== null"
          class="btn-secondary btn-soft btn-sm"
          label="Sortear resultado"
          :icon-left="IconDice5"
          @click="randomizeScore"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconDice5, IconPlus, IconTrash } from '@tabler/icons-vue';
import { getRandomScore, createMatch } from '~/helpers/match';

const tournamentStore = useTournamentStore();

const emit = defineEmits<{
  'winner-updated': [PlayoffRoundWinner];
}>();
const slot = defineModel<PlayoffRound['slots'][number]>('slot', { required: true });

function addMatchToSlot() {
  slot.value.legs.push(createMatch(slot.value.legs[0].awayTeam.id, slot.value.legs[0].homeTeam.id));
}

function randomizeScore() {
  slot.value.legs.forEach((_, index) => {
    slot.value.legs[index]!.homeTeam.score = getRandomScore();
    slot.value.legs[index]!.awayTeam.score = getRandomScore();
  });
}

const winner = computed<PlayoffRoundWinner>(() => {
  if (slot.value.legs.some((m) => m.homeTeam.score === null || m.awayTeam.score === null)) return null;

  const homeScore = slot.value.legs.reduce((sum, m) => m.homeTeam.score! + sum, 0);
  const awayScore = slot.value.legs.reduce((sum, m) => m.awayTeam.score! + sum, 0);

  if (homeScore > awayScore) return slot.value.legs[0].homeTeam.id;
  if (homeScore < awayScore) return slot.value.legs[0].awayTeam.id;
  return null;
});

watch(winner, () => emit('winner-updated', winner.value));
</script>
