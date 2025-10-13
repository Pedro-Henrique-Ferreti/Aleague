<template>
  <div class="grid gap-1.5 grid-rows-[auto_1fr] not-first:[&_.bracket]:mb-0! first:[&_.bracket]:before:hidden! first:[&_.bracket]:after:hidden!">
    <input
      v-model.lazy="name"
      type="text"
      class="w-full text-lg text-center font-medium"
      :id="inputId"
    >
    <div class="flex flex-col gap-0.75">
      <div
        v-for="slot in slots"
        class="bracket flex h-full items-center even:not-last:mb-1"
        :key="slot.id"
      >
        <MatchCard
          v-model:home-score="slot.matches[0].homeTeam.score"
          v-model:away-score="slot.matches[0].awayTeam.score"
          layout="vertical"
          class="card card-border p-0.75 order-1"
          :match="slot.matches[0]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const inputId = useId();

const name = defineModel<PlayoffRound['name']>('name', { required: true });
const slots = defineModel<PlayoffRound['slots']>('slots', { required: true });
</script>

<style scoped>
@reference '@/assets/css/main.css';

.bracket::before, .bracket::after {
  @apply block shrink-0 border border-gray-300 content-[''];
}
.bracket::before {
  @apply w-1.75 h-1/2 rounded-xl rounded-l-none border-2 border-l-0;
}
.bracket::after {
  @apply w-2.5;
}
</style>
