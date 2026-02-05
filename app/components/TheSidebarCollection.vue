<template>
  <li class="gap-0.25">
    <span>
      <IconFolderOpen class="h-1 w-1" />
      {{ collection.name }}
    </span>
    <ul class="grid gap-0.25">
      <TheSidebarFileItem
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { IconFolderOpen } from '@tabler/icons-vue';

const tournamentStore = useTournamentStore();

const props = defineProps<{ collection: Collection }>();

const tournaments = computed(() => tournamentStore.tournaments.filter((t) => t.collectionId === props.collection.id));
</script>
