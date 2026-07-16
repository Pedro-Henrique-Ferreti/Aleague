<template>
  <div>
    <div class="divider m-0 h-fit" />
    <div class="table-container">
      <div
        v-resize-observer="getFadedBorderSize"
        ref="table-wrapper"
        class="overflow-x-auto"
      >
        <table class="table static">
          <TransitionGroup
            tag="tbody"
            :name="disableMovementTransition ? undefined : 'table-entries'"
          >
            <tr
              key="header"
              class="text-xs text-gray-500 bg-gray-1 [&_th]:p-0.75 [&_th]:text-center"
            >
              <th
                class="resize-observer"
                aria-hidden="true"
              />
              <th class="position bg-inherit">
                Posição
              </th>
              <th class="min-w-3">Pts</th>
              <template v-if="displayMode === 'complete'">
                <th class="min-w-3">J</th>
                <th class="min-w-3">V</th>
                <th class="min-w-3">E</th>
                <th class="min-w-3">D</th>
                <th class="min-w-3">GP</th>
                <th class="min-w-3">GC</th>
                <th class="min-w-3">SG</th>
                <th class="min-w-4">%</th>
                <th v-if="showForm">Recentes</th>
                <th />
              </template>
            </tr>
            <StandingsTableRow
              v-for="entry, index in tableEntriesSorted"
              :key="entry.id"
              :is-clickable="disableRowClick !== true && !disabledEntries?.includes(entry.id)"
              :disabled="disabledEntries?.includes(entry.id)"
              :entry="entry"
              :sort-type="sortType"
              :show-form="showForm"
              :display-mode="displayMode"
              @click="selectedTableEntry = entry"
            >
              <template #resize-observer>
                <td
                  v-resize-observer="onResizeObserver"
                  class="resize-observer p-0!"
                />
              </template>
              <template #team>
                <td class="position bg-inherit h-[2.875rem] py-0 border-0">
                  <StandingsTableTeam
                    v-if="entry.team"
                    v-model:qualifier="qualifier[index]!"
                    :position="index + 1"
                    :team-id="entry.team"
                    :disable-qualifier-selector="displayMode !== 'complete' || disableRowClick"
                  />
                </td>
              </template>
            </StandingsTableRow>
          </TransitionGroup>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResizeObserverCallback } from '@vueuse/core';
import type { StandingsTableRowProps } from './StandingsTableRow.vue';
import { vResizeObserver } from '@vueuse/components';
import { getTableEntry, sortTableEntries } from '~/helpers/standings.js';

export type StandingsTableProps = Pick<StandingsTableRowProps, 'showForm' | 'displayMode'> & {
  standings: GroupStage['groups'][number]['standings'];
  disableMovementTransition?: boolean;
  disableRowClick?: boolean;
  disabledEntries?: StandingsEntry['id'][];
  filters?: Partial<Pick<StandingsFilters, 'entryType' | 'sortType' | 'week' | 'weekDirection'>>;
};

const props = withDefaults(defineProps<StandingsTableProps>(), {
  displayMode: 'complete',
});

const sortType = computed(() => props.filters?.sortType ?? TableEntrySortType.POINTS);
const entryType = computed(() => props.filters?.entryType ?? TableEntryType.OVERALL);

const qualifier = defineModel<LegendColor[]>('qualifier', { required: true });
const selectedTableEntry = defineModel<TableEntry>('tableEntry');

const tableWrapperRef = useTemplateRef('table-wrapper');
const tableScroll = useScroll(tableWrapperRef);
const positionSize = ref('0px');
const fadedBorderSize = ref('0px');

const tableEntries = computed<TableEntry[]>(() => (
  props.standings.map(i => getTableEntry(
    i,
    entryType.value,
    props.filters?.week === DEFAULT_WEEK_OPTION.value ? undefined : props.filters?.week,
    props.filters?.weekDirection,
  ))
));
const tableEntriesSorted = computed(() => (
  tableEntries.value.toSorted((a, b) => sortTableEntries(a, b, sortType.value))
));

const onResizeObserver: ResizeObserverCallback = (entries) => {
  positionSize.value = `${entries[0]?.contentRect.width || 0}px`;
};

function getFadedBorderSize() {
  const clientWidth = tableWrapperRef.value?.clientWidth || 0;
  const scrollWidth = tableWrapperRef.value?.scrollWidth || 0;
  const scrollSize = scrollWidth - clientWidth;

  fadedBorderSize.value = `${scrollSize - tableScroll.x.value}px`;
}

watch(tableScroll.x, getFadedBorderSize, { immediate: true });
</script>

<style scoped>
@reference '@/assets/css/main.css';

.table-container {
  @apply relative;
}
.table-container::after {
  width: v-bind(fadedBorderSize);
  @apply content-[''] max-w-2.25 h-[calc(100%-1rem)] bg-linear-to-l from-white to-transparent absolute right-0 top-0 pointer-events-none;
}
.resize-observer {
  @apply min-w-16 w-[40%];
}
.position {
  width: v-bind(positionSize);
  @apply text-left absolute left-0;
}

.table-entries-move,
.table-entries-enter-active,
.table-entries-leave-active {
  @apply transition-all duration-300 ease-out;
}
.table-entries-enter-from,
.table-entries-leave-to {
  @apply translate-x-2;
}
.table-entries-leave-active {
  @apply absolute;
}
</style>
