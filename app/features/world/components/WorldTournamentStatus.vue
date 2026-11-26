<template>
  <div class="flex flex-col gap-0.25 text-xs">
    <template v-if="seasonState === SeasonState.SETUP">
      <AppBadge
        class="badge-soft badge-sm"
        :class="tournament.isReady ? 'badge-success' : 'badge-warning'"
        :icon="tournament.isReady ? IconCircleCheck : IconAlertTriangle"
        :text="tournament.isReady ? 'Pronto' : 'Pendente'"
      />
    </template>
    <template v-else-if="tournament.champion">
      <span class="text-base-content/70">Campeão</span>
      <TeamDetails
        size="xs"
        :team="tournament.champion"
      />
    </template>
    <template v-else-if="tournament.matches">
      <span class="text-base-content/70">
        {{ tournament.matches.played }} / {{ tournament.matches.total }} partidas
      </span>
      <AppProgress
        color="primary"
        :value="Math.round((tournament.matches.played / tournament.matches.total) * 100)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-vue';

defineProps<{
  tournament: WorldTournamentSummary;
  seasonState: SeasonState;
}>();
</script>
