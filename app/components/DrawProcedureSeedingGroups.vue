<template>
  <div class="grid gap-1 gap-y-1.5 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] mt-2">
    <TeamGroupCard
      v-for="group in groups"
      :key="group.order"
      :title="group.name"
    >
      <TeamSlot
        v-for="team, index in group.teams"
        :key="index"
        :team-id="team"
        @remove="group.teams[index] = null"
      />
    </TeamGroupCard>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  groups: DrawProcedureForm['groups'];
}>();
</script>
