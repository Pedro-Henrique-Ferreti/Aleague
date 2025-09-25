<template>
  <pre>{{ stage }}</pre>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentGroupsStage>({ required: true });
</script>
