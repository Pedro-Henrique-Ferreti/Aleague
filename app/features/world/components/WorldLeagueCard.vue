<template>
  <section class="card card-border">
    <div class="card-body gap-0 p-1">
      <header class="flex items-center justify-between gap-1 mb-0.5">
        <div class="flex items-center gap-0.75">
          <IconTrophy class="size-1.5 text-primary" />
          <h3 class="font-medium text-base">{{ competition.name }}</h3>
        </div>
        <div class="badge-container">
          <AppBadge
            class="badge-soft badge-secondary badge-sm"
            :text="SCOPE_LABEL[competition.scope]"
          />
          <AppBadge
            class="badge-soft badge-primary badge-sm"
            :text="`${competition.tournaments.length} ${competition.tournaments.length === 1 ? 'nível' : 'níveis'}`"
          />
        </div>
      </header>
      <ul>
        <WorldTournamentRow
          v-for="(tournament, index) in competition.tournaments"
          :key="tournament.id"
          :tournament="tournament"
          :season-state="seasonState"
        >
          <template #leading>{{ index + 1 }}</template>
        </WorldTournamentRow>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconTrophy } from '@tabler/icons-vue';

defineProps<{
  competition: WorldCompetitionSummary;
  seasonState: SeasonState;
}>();
</script>
