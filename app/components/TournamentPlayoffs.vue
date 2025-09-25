<template>
  <pre>{{ stage }}</pre>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentPlayoffsStage>({ required: true });
</script>
