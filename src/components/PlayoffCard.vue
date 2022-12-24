<template>
  <div class="playoff-card">
    <div class="playoff-card__teams">
      <span class="playoff-card__team">
        {{ confrontation.teams[0]?.name }}
      </span>
      <span class="playoff-card__team">
        {{ confrontation.teams[1]?.name }}
      </span>
    </div>
    <div class="playoff-card__game">
      <input
        class="playoff-card__game-input"
        type="number"
      />
      <input
        class="playoff-card__game-input"
        type="number"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PlayoffConfrontation } from '@/types/Playoff';

defineProps({
  confrontation: {
    type: Object as PropType<PlayoffConfrontation>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.playoff-card {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 19rem;
  min-height: 5rem;
  height: fit-content;
  &__teams {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.5rem;
  }
  &__game {
    width: 2rem;
    background: $color--light-gray-2;
    border-radius: 0.375rem;
  }
  &__game-input {
    @include focus-ring;
    width: 100%;
    height: 50%;
    padding: 0.25rem;
    background-color: transparent;
    border: 0;
    border-radius: inherit;
    font-weight: $font-weight--semibold;
    text-align: center;
    &:focus {
      border: 1px solid $color--primary;
      box-shadow: 0 0 0 0.2rem get-hexadecimal-transparency($color--primary, 25);
    }
  }
}
</style>
