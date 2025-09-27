<template>
  <div class="card card-border rounded-lg flex-row items-center">
    <label class="input input-ghost max-w-14">
      <IconSearch class="h-[1em] opacity-50" />
      <input type="search" class="grow" placeholder="Search" />
    </label>
    <div class="divider divider-horizontal m-0" />
    <BaseSelect
      v-model="form.filter"
      class="w-8 select-sm select-ghost"
      :options="TEAM_FILTER_OPTIONS"
    />
  </div>
</template>

<script lang="ts">
enum TeamFilter {
  ALL,
  NATIONAL,
  CUSTOM,
}
</script>

<script lang="ts" setup>
import { IconSearch } from '@tabler/icons-vue';

const TEAM_FILTER_OPTIONS: SelectOptionList<TeamFilter> = [
  { label: 'Todos', value: TeamFilter.ALL },
  { label: 'Seleção', value: TeamFilter.NATIONAL },
  { label: 'Personalizado', value: TeamFilter.CUSTOM },
];

const form = ref<{ filter: TeamFilter}>({
  filter: TeamFilter.ALL,
});
</script>
