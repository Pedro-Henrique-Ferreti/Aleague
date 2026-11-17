<template>
  <div class="flex items-center gap-1 bg-gray-100 rounded-lg py-0.25 px-0.75">
    <img
      class="size-2"
      alt="Escudo da equipe"
      :src="winner.badge"
    >
    <div>
      <div class="font-medium text-xs text-gray-500">Vencedor</div>
      {{ winner.name }}
    </div>
    <IconTrophyWinner
      class="size-2"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import IconTrophyWinner from '@/assets/icons/TrophyWinner.svg';

defineProps<{
  winner: NonNullable<TournamentWinner>
}>();
</script>
