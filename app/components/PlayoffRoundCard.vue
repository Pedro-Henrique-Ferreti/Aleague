<template>
  <div class="flex h-full items-center">
    <div class="card card-border dropdown dropdown-hover dropdown-right p-0.75 order-1 w-full group">
      <MatchCard
        v-model:home-score="slot.matches[0].homeTeam.score"
        v-model:away-score="slot.matches[0].awayTeam.score"
        role="button"
        tabindex="0"
        layout="vertical"
        :match="slot.matches[0]"
        :fixture-two-home-score="slot.matches[1]?.homeTeam.score"
        :fixture-two-away-score="slot.matches[1]?.awayTeam.score"
        @update:fixture-two-home-score="slot.matches[1] ? slot.matches[1].homeTeam.score = $event as Match['homeTeam']['score'] : null"
        @update:fixture-two-away-score="slot.matches[1] ? slot.matches[1].awayTeam.score = $event as Match['awayTeam']['score'] : null"
      />
      <div class="dropdown-content menu bg-base-100 w-9 rounded-box z-1 shadow-sm">
        <AppButton
          v-if="slot.matches.length <= 1"
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
          @click="slot.matches.pop()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { IconPlus, IconTrash } from '@tabler/icons-vue';

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
