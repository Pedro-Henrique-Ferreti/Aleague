<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-lg font-medium">{{ title }}</div>
        <slot name="header" />
      </header>
      <slot />
      <StandingsTable
        v-model:qualifier="qualifier"
        :standings="standings"
        :show-form="!!matchweeks?.length"
        :disable-row-click="!renderFormModal"
        :disable-movement-transition="matchweekCardStore.isSimulatingResults"
        :table-entry="selectedTableEntry"
        :entry-type="entryType"
        :sort-type="sortType"
        :displayed-week="displayedWeek"
        :week-direction="weekDirection"
        @update:table-entry="onTableEntryClick"
      />
    </div>
  </section>
  <StandingsFormModal
    v-model:entry="selectedTableEntry"
    :standings="standings"
  />
</template>

<script lang="ts" setup>
import type { StandingsTableProps } from './StandingsTable.vue';

type StandingsCardProps = Pick<StandingsTableProps, 'standings' | 'entryType' | 'sortType' | 'displayedWeek' | 'weekDirection'> & {
  title: string;
  matchweeks?: GroupStage['matchweeks'];
};

const props = defineProps<StandingsCardProps>();

const matchweekCardStore = useMatchweekCardStore();

const qualifier = defineModel<Qualifier[]>('qualifier', { required: true });

const selectedTableEntry = ref<TableEntry>();
const renderFormModal = computed(() => !!props.matchweeks?.length);

function onTableEntryClick(entry: TableEntry | undefined) {
  selectedTableEntry.value = undefined;
  nextTick(() => {
    selectedTableEntry.value = entry;
  });
}
</script>
