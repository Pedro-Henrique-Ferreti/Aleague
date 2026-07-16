<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-lg font-medium">{{ title }}</div>
        <slot name="header" />
      </header>
      <slot />
      <StandingsTable
        v-model:legend="legend"
        class="mt-0.75"
        :standings="standings"
        :show-form="!!matchweeks?.length"
        :disable-row-click="!renderFormModal || matchweekCardStore.isSimulatingResults"
        :disable-movement-transition="matchweekCardStore.isSimulatingResults"
        :table-entry="selectedTableEntry"
        :filters="filters"
        @update:table-entry="onTableEntryClick"
      />
    </div>
  </section>
  <StandingsFormModal
    v-if="renderFormModal"
    v-model:entry="selectedTableEntry"
    :standings="standings"
  />
</template>

<script lang="ts" setup>
import type { StandingsTableProps } from './StandingsTable.vue';

type StandingsCardProps = Pick<StandingsTableProps, 'standings' | 'filters'> & {
  title: string;
  matchweeks?: GroupStage['matchweeks'];
};

const props = defineProps<StandingsCardProps>();

const matchweekCardStore = useMatchweekCardStore();

const legend = defineModel<LegendColor[]>('legend', { required: true });

const selectedTableEntry = ref<TableEntry>();
const renderFormModal = computed(() => !!props.matchweeks?.length);

function onTableEntryClick(entry: TableEntry | undefined) {
  selectedTableEntry.value = undefined;
  nextTick(() => {
    selectedTableEntry.value = entry;
  });
}
</script>
