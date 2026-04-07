<template>
  <div
    v-if="title"
    class="flex gap-0.25 items-center"
  >
    <span class="font-semibold">{{ title }}</span>
    <AppButton
      class="btn-square btn-ghost btn-xs"
      aria-label="Filters"
      :icon-left="showFilters ? IconChevronUp : IconChevronDown"
      @click="showFilters = !showFilters"
    />
  </div>
  <template v-if="showFilters">
    <div class="flex flex-wrap gap-0.5 mt-0.5">
      <input
        v-for="team in options"
        v-model="selectedTeams"
        :key="String(team)"
        class="btn btn-xs rounded-md"
        type="checkbox"
        name="teams"
        :value="team"
        :aria-label="getTeamById(team)?.name"
      >
      <button
        class="btn btn-square btn-xs rounded-md"
        type="button"
        aria-label="Clear selected teams"
        @click="selectedTeams = []"
      >
        ✕
      </button>
    </div>
    <div
      v-if="$slots.default"
      class="mt-0.75"
    >
      <slot />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue';

const props = defineProps<{
  title?: string;
  options: Team['id'][];
}>();

const { getTeamById } = useTeamStore();

const selectedTeams = defineModel<Team['id'][]>({ default: () => [] });

const showFilters = ref(!props.title);
</script>
