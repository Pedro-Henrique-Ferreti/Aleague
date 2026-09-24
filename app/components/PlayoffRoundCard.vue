<template>
  <div class="flex h-full items-center">
    <div
      class="card card-border dropdown dropdown-hover p-0.75 order-1 w-full group"
      :class="[dropdownPosition === 'left' ? 'dropdown-left' : 'dropdown-right']"
    >
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
          v-if="isMatchSeeded(slot.legs[0])"
          :label="`Simular partida${slot.legs.length > 1 ? 's' : ''}`"
          :icon="IconPlayerPlay"
          @click="simulatePlayoffRoundSlotScore(slot)"
        />
        <PlayoffSlotMenuLegOption
          :legs-count="slot.legs.length"
          @add-second-leg="addSecondLegToSlot(slot)"
          @remove-second-leg="slot.legs.pop()"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPlayerPlay } from '@tabler/icons-vue';
import { isMatchSeeded, isMatchUnseeded } from '~/helpers/match';
import { resetMatchScore } from '~/helpers/match-score';
import { addSecondLegToSlot, getPlayoffRoundSlotWinner, simulatePlayoffRoundSlotScore } from '~/helpers/playoff-slot';

export interface PlayoffRoundCardProps {
  dropdownPosition?: 'right' | 'left';
}

withDefaults(defineProps<PlayoffRoundCardProps>(), {
  dropdownPosition: 'right',
});

const tournamentStore = useTournamentStore();

const slot = defineModel<PlayoffRound['slots'][number]>({ required: true });

const winner = computed(() => getPlayoffRoundSlotWinner(slot.value));

watch(() => isMatchUnseeded(slot.value.legs[0]), (isUnseeded) => {
  if (isUnseeded) {
    slot.value.legs.forEach(resetMatchScore);
  }
});
</script>
