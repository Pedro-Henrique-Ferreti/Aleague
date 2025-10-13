<template>
  <div class="flex h-full items-center">
    <div class="card card-border p-0.75 order-1 w-full relative group">
      <MatchCard
        v-model:home-score="slot.matches[0].homeTeam.score"
        v-model:away-score="slot.matches[0].awayTeam.score"
        layout="vertical"
        :match="slot.matches[0]"
        :fixture-two-home-score="slot.matches[1]?.homeTeam.score"
        :fixture-two-away-score="slot.matches[1]?.awayTeam.score"
        @update:fixture-two-home-score="slot.matches[1] ? slot.matches[1].homeTeam.score = $event as Match['homeTeam']['score'] : null"
        @update:fixture-two-away-score="slot.matches[1] ? slot.matches[1].awayTeam.score = $event as Match['awayTeam']['score'] : null"
      />
      <AppButton
        v-if="slot.matches.length <= 1"
        v-tooltip="'Adicionar jogo de volta'"
        class="btn-square btn-primary btn-xs rounded-md absolute! top-1/2 -translate-y-1/2! right-0 translate-x-1/2 hidden group-[:hover]:block"
        :icon-left="IconPlus"
        @click="addMatchToSlot"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { IconPlus } from '@tabler/icons-vue';

const slot = defineModel<PlayoffRound['slots'][number]>('slot', { required: true });

function addMatchToSlot() {
  slot.value.matches.push({
    id: uuidv4(),
    kickoff: null,
    homeTeam: {
      id: slot.value.matches[0].awayTeam.id,
      score: null,
    },
    awayTeam: {
      id: slot.value.matches[0].homeTeam.id,
      score: null,
    },
  });
}
</script>
