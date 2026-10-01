<template>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-2">
    <TeamGroupCard
      v-for="group in groups"
      :key="group.order"
      :class="{ 'outline-2 outline-secondary -outline-offset-1': activeTeamSeedingGroup.value?.order === group.order }"
      :title="group.name"
    >
      <TeamSlot
        v-for="team, index in group.teams"
        :key="index"
        class="animate-fade"
        :team-id="team"
      />
    </TeamGroupCard>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  groups: DrawProcedureForm['groups'];
  activeTeamSeedingGroup: ReturnType<typeof useSeedingDraw>['activeTeamSeedingGroup'];
}>();
</script>
