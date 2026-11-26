<template>
  <li class="flex items-center gap-0.75 py-0.75 not-last:border-b border-base-200">
    <div class="grid place-items-center shrink-0 size-2 rounded-field bg-base-200 text-sm font-medium">
      <slot name="leading" />
    </div>
    <div class="min-w-0 grow">
      <div class="font-medium truncate">{{ tournament.name }}</div>
      <div class="text-xs text-base-content/70 whitespace-nowrap">{{ tournament.teamsCount }} equipes</div>
    </div>
    <WorldTournamentStatus
      class="hidden tablet:flex w-9 shrink-0"
      :season-state="seasonState"
      :tournament="tournament"
    />
    <div class="hidden tablet-md:block w-8 shrink-0 text-xs text-base-content/70">
      <template v-if="tournament.lastChampion">
        <div class="mb-0.25">Último campeão</div>
        <TeamDetails
          class="text-base-content"
          size="xs"
          :team="tournament.lastChampion"
        />
      </template>
    </div>
    <BaseButton
      class="btn btn-ghost btn-square btn-sm shrink-0"
      aria-label="Abrir campeonato"
    >
      <IconChevronRight class="size-1" />
    </BaseButton>
  </li>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';

defineProps<{
  tournament: WorldTournamentSummary;
  seasonState: SeasonState;
}>();
</script>
