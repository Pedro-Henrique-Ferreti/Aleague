<template>
  <div class="team-rivals | app-base-card">
    {{ team.name }}
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TeamDetails } from '@/types/Team';

defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>

</style>
