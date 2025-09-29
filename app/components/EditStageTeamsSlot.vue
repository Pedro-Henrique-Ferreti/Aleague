<template>
  <div class="flex gap-0.5 w-full h-2.5 p-0.5 border border-dashed border-base-200 rounded-lg">
    <template v-if="!team">
      Em aberto
    </template>
    <template v-else>
      <img
        class="max-w-1.5 max-h-1.5"
        alt="Team badge"
        :src="getTeamById(team.id)?.badge || ''"
      />
      <span>{{ team.name }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { getTeamById } = useTeamStore();

defineProps<{
  team: Team | null;
}>();
</script>
