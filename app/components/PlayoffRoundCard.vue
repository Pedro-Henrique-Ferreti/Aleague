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
        :winner-team-id="winner ?? undefined"
        @update:fixture-two-home-score="slot.legs[1] ? slot.legs[1].homeTeam.score = $event as Match['homeTeam']['score'] : null"
        @update:fixture-two-away-score="slot.legs[1] ? slot.legs[1].awayTeam.score = $event as Match['awayTeam']['score'] : null"
      />
      <ul class="dropdown-content menu bg-base-100 w-14 rounded-box z-1 shadow-sm">
        <AppMenuItem
          v-if="slot.legs[0].homeTeam.id !== null && slot.legs[0].awayTeam.id !== null"
          :label="`Simular partida${slot.legs.length > 1 ? 's' : ''}`"
          :icon="IconPlayerPlay"
          @click="simulateScore"
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
import { IconPlayerPlay, IconPlus, IconTrash } from '@tabler/icons-vue';
import { newMatch } from '~/helpers/match';
import { simulateMatchScore } from '~/helpers/match-simulation';

const emit = defineEmits<{
  winnerUpdated: [PlayoffRoundSlotWinner];
}>();

const tournamentStore = useTournamentStore();

const slot = defineModel<PlayoffRound['slots'][number]>({ required: true });

function addMatchToSlot() {
  slot.value.legs.push(newMatch(slot.value.legs[0].awayTeam.id, slot.value.legs[0].homeTeam.id));
}

const winner = computed<PlayoffRoundSlotWinner>(() => {
  if (slot.value.legs.some(m => m.homeTeam.score === null || m.awayTeam.score === null)) return null;

  const [firstLeg, secondLeg] = slot.value.legs;

  const homeScore = firstLeg.homeTeam.score! + (secondLeg?.awayTeam.score ?? 0);
  const awayScore = firstLeg.awayTeam.score! + (secondLeg?.homeTeam.score ?? 0);

  if (homeScore > awayScore) return slot.value.legs[0].homeTeam.id;
  if (homeScore < awayScore) return slot.value.legs[0].awayTeam.id;
  return null;
});

watch(winner, () => emit('winnerUpdated', winner.value));

function simulateScore() {
  do {
    for (const match of slot.value.legs) {
      const { home, away } = simulateMatchScore(match.homeTeam.id, match.awayTeam.id);
      match.homeTeam.score = home;
      match.awayTeam.score = away;
    }
  }
  while (winner.value === null);
}
</script>
