<template>
  <div class="round">
    <div class="flex justify-center items-center px-2.5 min-h-2 relative">
      <h2 class="text-lg text-center font-medium">{{ round.name }}</h2>
      <div class="absolute top-0 right-0">
        <PlayoffRoundOptions v-model="round" />
      </div>
    </div>
    <div class="flex flex-col gap-0.75">
      <PlayoffRoundCard
        v-for="(slot, index) in round.slots"
        :key="slot.id"
        class="bracket"
        :model-value="slot"
        :dropdown-position="cardDropdownPosition"
        @update:model-value="round.slots[index] = $event"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlayoffRoundCardProps } from './PlayoffRoundCard.vue';
import PlayoffRoundOptions from './PlayoffRoundOptions.vue';

export interface PlayoffRoundProps {
  cardDropdownPosition?: PlayoffRoundCardProps['dropdownPosition'];
}

defineProps<PlayoffRoundProps>();

const round = defineModel<PlayoffRound>({ required: true });
</script>

<style scoped>
@reference '@/assets/css/main.css';

.round {
  @apply grid gap-1.5 grid-rows-[auto_1fr] not-first:[&_.bracket]:mb-0! first:[&_.bracket]:before:hidden! first:[&_.bracket]:after:hidden!;
}

.bracket {
  @apply relative;
}

.bracket::before, .bracket::after {
  @apply block shrink-0 border border-gray-300 content-[''] absolute;
}
.bracket::before {
  @apply w-1.75 h-1/2 rounded-xl rounded-l-none border-2 border-l-0 -translate-x-4.25;
}
.bracket::after {
  @apply w-2.5 -translate-x-full;
}
</style>
