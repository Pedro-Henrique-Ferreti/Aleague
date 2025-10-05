<template>
  <section class="grid gap-2 tablet-lg:grid-cols-[2fr_1fr]">
    <div class="grid gap-1.5 h-fit">
      <StandingsCard
        v-for="(group, index) in stage.groups"
        v-model="stage.groups[index]!"
        :key="group.order"
        :title="stage.groups.length === 1 ? 'Classificação' : `Grupo ${group.order}`"
        :show-filters="index === 0"
      />
    </div>
    <MatchweekCard :model-value="stage" />
  </section>
</template>

<script lang="ts" setup>
const stage = defineModel<TournamentGroupsStage>({ required: true });
</script>
