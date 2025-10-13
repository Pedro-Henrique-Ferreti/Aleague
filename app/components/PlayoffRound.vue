<template>
  <div class="grid gap-1.5 grid-rows-[auto_1fr] w-full max-w-1/3 not-first:[&_.card]:mb-0!">
    <input
      v-model.lazy="name"
      type="text"
      class="w-full text-lg text-center font-medium"
      :id="inputId"
    >
    <div class="flex flex-col justify-around gap-0.75">
      <MatchCard
        v-for="slot in slots"
        v-model:home-score="slot.matches[0].homeTeam.score"
        v-model:away-score="slot.matches[0].awayTeam.score"
        layout="vertical"
        class="card card-border p-0.75 even:not-last:mb-1"
        :key="slot.id"
        :match="slot.matches[0]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const inputId = useId();

const name = defineModel<PlayoffRound['name']>('name', { required: true });
const slots = defineModel<PlayoffRound['slots']>('slots', { required: true });
</script>
