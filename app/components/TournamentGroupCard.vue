<template>
  <div class="card card-border">
    <div class="card-body p-1.25">
      <div class="text-xl font-medium">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  standings: StandingsEntry[];
}>();
</script>
