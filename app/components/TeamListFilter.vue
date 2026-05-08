<template>
  <div
    v-if="title"
    class="flex gap-0.25 items-center"
  >
    <span class="font-semibold">{{ title }}</span>
    <AppButton
      class="btn-square btn-ghost btn-xs"
      aria-label="Filtros"
      :icon-left="showFilters ? IconChevronUp : IconChevronDown"
      @click="showFilters = !showFilters"
    />
  </div>
  <template v-if="showFilters">
    <AppFilter
      v-model="selectedTeams"
      class="mt-0.5"
      input-name="teams"
      :options="filterOptions"
    />
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

const filterOptions = computed(() => props.options.map(id => ({
  value: id,
  label: getTeamById(id)?.name ?? id,
})));
</script>
