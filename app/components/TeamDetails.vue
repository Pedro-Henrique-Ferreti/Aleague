<template>
  <div class="flex items-center gap-0.75">
    <img
      class="size-1.5 shrink-0"
      alt="Escudo da equipe"
      :src="team.badge"
    >
    <span>
      {{ team.name }}
      <span
        v-if="showCountry"
        class="text-xs"
      >
        ({{ team.country }})
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  team: TeamDetails;
  showCountry?: boolean;
}>();
</script>
