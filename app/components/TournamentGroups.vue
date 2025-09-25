<template>
  <section class="grid">
    <div class="grid gap-1.5">
      <TournamentGroupCard
        v-for="group in stage.groups"
        :key="group.order"
        :title="stage.groups.length === 1 ? 'Classificação' : `Grupo ${group.order}`"
        :standings="group.standings"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentGroupsStage>({ required: true });
</script>
