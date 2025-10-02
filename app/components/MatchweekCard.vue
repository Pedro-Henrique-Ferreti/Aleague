<template>
  <div class="card card-border h-fit">
    <div class="card-body">
      <MatchweekCardEmptyState
        v-if="stage.matchweeks.length === 0"
        :stage="stage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentGroupsStage>({ required: true });
</script>
