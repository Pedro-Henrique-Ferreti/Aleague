<template>
  <li>
    <span>
      <IconFolderOpen class="h-1 w-1" />
      {{ collection.name }}
    </span>
    <ul>
      <TheSidebarFileItem
        v-for="tournament in collection.tournaments"
        :key="tournament.id"
        :tournament="tournament"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { IconFolderOpen } from '@tabler/icons-vue';

defineProps<{ collection: Collection }>();
</script>
