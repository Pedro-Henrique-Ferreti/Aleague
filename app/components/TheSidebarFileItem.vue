<template>
  <li
    v-tooltip.right="name"
    class="overflow-auto"
  >
    <BaseButton
      class="truncate w-full block"
      :class="{ 'bg-base-200': tournament && tournament.id === tournamentStore.activeTournament?.id }"
      :to="tournamentFile && { name: 'editor', params: { fileId: tournamentFile.id } }"
      @click="tournament && tournamentStore.setActiveTournament(tournament.id)"
    >
      <IconFileDescription class="h-1 w-1 inline-block" />
      {{ name }}
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

const props = defineProps<{
  tournament?: Tournament;
  tournamentFile?: TournamentFile;
}>();

const tournamentStore = useTournamentStore();

const name = computed(() => props.tournament?.name ?? props.tournamentFile?.data.name ?? '');
</script>
