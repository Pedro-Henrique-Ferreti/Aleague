<template>
  <TheSidebarMenuItem
    v-tooltip.right="label"
    :to="{ name: 'editor', params: { fileId, tournamentId } }"
    :icon="IconFileDescription"
    :label="label"
  />
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

defineProps<{
  fileId: SourceFile['id'];
  label: string;
  tournamentId?: Tournament['id'];
}>();
</script>
