<template>
  <li
    v-tooltip.right="label"
    class="overflow-auto"
  >
    <BaseButton
      class="truncate w-full block"
      :class="{ 'bg-base-200 text-base-content': tournamentId && tournamentId === tournamentStore.activeTournament?.id }"
      :to="{ name: 'editor', params: { fileId, tournamentId } }"
    >
      <IconFileDescription class="h-1 w-1 inline-block" />
      {{ label }}
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

defineProps<{
  fileId: SourceFile['id'];
  label: string;
  tournamentId?: Tournament['id'];
}>();

const tournamentStore = useTournamentStore();
</script>
