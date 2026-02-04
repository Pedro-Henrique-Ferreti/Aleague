<template>
  <li>
    <button
      type="button"
      :class="{ 'menu-active': false }"
    >
      <IconFileDescription class="h-1 w-1" />
      {{ tournament.name }}
    </button>
  </li>
</template>

<script lang="ts" setup>
import { IconFileDescription } from '@tabler/icons-vue';

defineProps<{ tournament: Tournament }>();
</script>
