<template>
  <div
    class="flex items-center"
    :class="size === 'xs' ? 'gap-0.25' : 'gap-0.75'"
  >
    <img
      class="shrink-0"
      alt="Escudo da equipe"
      :class="[size === 'xs' ? 'size-1' : 'size-1.5']"
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
  size?: 'xs'
  showCountry?: boolean;
}>();
</script>
