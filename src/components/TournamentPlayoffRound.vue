<template>
  <div class="playoff-round">
    <BaseInput
      v-model.lazy="nameInput"
      class="playoff-round__name-input"
      id=""
      type="text"
      headless
      name="Nome da fase"
    />
    <div class="playoff-round__matchups">
      <TournamentPlayoffRoundMatchup
        v-for="(matchup, index) in matchupsInput"
        v-model:matchup="matchupsInput[index]"
        class="playoff-round__matchup-card"
        :key="matchup.id"
        :is-last-round="isLastRound"
        @update-next-round="$emit('update-next-round', {
          team: $event.team,
          previousTeam: $event.previousTeam,
          nextRoundMatchupId: matchup.nextRoundMatchupId,
        })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentStageRoundMatchup } from '@/types/Tournament';
import type { MatchTeam } from '@/types/Match';
import { computed, type PropType } from 'vue';
import BaseInput from './BaseInput.vue';
import TournamentPlayoffRoundMatchup from './TournamentPlayoffRoundMatchup.vue';

const emit = defineEmits<{
  (e: 'update:name', value: string): void;
  (e: 'update:matchups', value: TournamentStageRoundMatchup[]): void;
  (e: 'update-next-round', value: {
    team: MatchTeam | null;
    previousTeam: MatchTeam | null;
    nextRoundMatchupId: string | null;
  }): void;
}>();
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  matchups: {
    type: Array as PropType<TournamentStageRoundMatchup[]>,
    required: true,
  },
  isLastRound: {
    type: Boolean,
    default: false,
  },
});

const nameInput = computed({
  get: () => props.name,
  set: (name) => emit('update:name', name),
});

const matchupsInput = computed({
  get: () => props.matchups,
  set: (matchups) => emit('update:matchups', matchups),
});
</script>

<style lang="scss" scoped>
.playoff-round {
  & + .playoff-round {
    --brackets-display: block;
  }
  &:nth-child(3) {
    --brackets-height: 2.125;
  }
  &:nth-child(4) {
    --brackets-height: 4.25;
  }
  width: 100%;
  max-width: 20rem;
  &__name-input {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 1.5rem;
    background-color: transparent;
    border: 0;
    border-radius: $radius--medium;
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
    text-align: center;
  }
  &__matchups {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  &__matchup-card {
    &::before,
    &::after {
      content: '';
      display: var(--brackets-display, none);
      pointer-events: none;
    }
    &::before {
      width: 1.625rem;
      height: calc(var(--brackets-height, 1) * 6.375rem);
      border: 0.125rem solid $color--text-400;
      border-left: 0;
      border-top-right-radius: 0.625rem;
      border-bottom-right-radius: 0.625rem;
      position: absolute;
      top: 50%;
      left: -4.125rem;
      transform: translateY(-50%);
    }
    &::after {
      width: 2.5rem;
      height: 0.125rem;
      background-color: $color--text-400;
      position: absolute;
      top: 50%;
      left: -2.5rem;
      transform: translateY(-50%);
    }
  }
}
</style>
