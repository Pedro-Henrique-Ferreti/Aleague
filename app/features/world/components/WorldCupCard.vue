<template>
  <BaseButton
    class="card card-border p-1 text-left hover:shadow-sm hover:border-base-300 transition-colors duration-200 ease-in-out"
  >
    <div class="flex justify-between">
      <IconTrophy class="size-2 text-primary" />
      <div class="badge-container">
        <AppBadge
          class="badge-soft badge-secondary badge-sm"
          :text="SCOPE_LABEL[competition.scope]"
        />
        <AppBadge
          class="badge-soft badge-sm"
          text="Copa"
        />
      </div>
    </div>
    <h3 class="mt-1 font-medium text-base mb-0.25">{{ competition.name }}</h3>
    <span class="text-base-content/70 text-xs mb-1">{{ tournament.teamsCount }} equipes</span>
    <WorldTournamentStatus
      class="mb-0.75"
      :season-state="seasonState"
      :tournament="tournament"
    />
    <span
      v-if="tournament.lastChampion"
      class="text-base-content/70 text-xs flex gap-0.5 mt-auto"
    >
      Último campeão:
      <TeamDetails
        size="xs"
        :team="tournament.lastChampion"
      />
    </span>
  </BaseButton>
</template>

<script setup lang="ts">
import { IconTrophy } from '@tabler/icons-vue';

const props = defineProps<{
  competition: WorldCompetitionSummary;
  seasonState: SeasonState;
}>();

const tournament = computed(() => props.competition.tournaments[0]!);
</script>
