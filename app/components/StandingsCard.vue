<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-lg font-medium">{{ title }}</div>
        <slot name="header" />
      </header>
      <slot />
      <div class="divider mt-0.5 -mb-[7px]" />
      <div class="table-container">
        <div
          v-resize-observer="getFadedBorderSize"
          ref="table-wrapper"
          class="overflow-x-auto"
        >
          <table class="table static">
            <TransitionGroup
              name="table-entries"
              tag="tbody"
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
                <th class="min-w-3">J</th>
                <th class="min-w-3">V</th>
                <th class="min-w-3">E</th>
                <th class="min-w-3">D</th>
                <th class="min-w-3">GP</th>
                <th class="min-w-3">GC</th>
                <th class="min-w-3">SG</th>
                <th class="min-w-4">%</th>
                <th v-if="matchweeks?.length">Recentes</th>
                <th />
              </tr>
              <StandingsCardTableRow
                v-for="entry, index in tableEntriesSorted"
                :key="entry.id"
                :is-clickable="renderFormModal"
                :entry="entry"
                :sort-type="sortType"
                :show-form="matchweeks && matchweeks.length > 0"
                @click="onTableEntryClick(entry)"
              >
                <template #resize-observer>
                  <td
                    v-resize-observer="onResizeObserver"
                    class="resize-observer p-0!"
                  />
                </template>
                <template #team>
                  <td class="position bg-inherit h-[2.875rem] py-0 border-0">
                    <StandingsCardTeam
                      v-if="entry.team"
                      v-model:qualifier="qualifier[index]!"
                      :position="index + 1"
                      :team-id="entry.team"
                    />
                  </td>
                </template>
              </StandingsCardTableRow>
            </TransitionGroup>
          </table>
        </div>
      </div>
    </div>
  </section>
  <StandingsFormModal
    v-model:entry="selectedTableEntry"
    :standings="standings"
  />
</template>

<script lang="ts" setup>
import type { ResizeObserverCallback } from '@vueuse/core';
import { vResizeObserver } from '@vueuse/components';
import { getTableEntry, sortTableEntries } from '~/helpers/standings';

interface Props {
  title: string;
  standings: GroupStage['groups'][number]['standings'];
  entryType?: TableEntryType;
  sortType?: TableEntrySortType;
  matchweeks?: GroupStage['matchweeks'];
  displayedWeek?: Matchweek['week'];
  weekDirection?: WeekDirection;
}

const props = withDefaults(defineProps<Props>(), {
  sortType: TableEntrySortType.POINTS,
  entryType: TableEntryType.OVERALL,
});

const qualifier = defineModel<Qualifier[]>('qualifier', { required: true });

const tableEntries = computed<TableEntry[]>(() => (
  props.standings.map(i => getTableEntry(i, props.entryType, props.displayedWeek, props.weekDirection))
));
const tableEntriesSorted = computed(() => (
  tableEntries.value.toSorted((a, b) => sortTableEntries(a, b, props.sortType))
));

// Form modal
const selectedTableEntry = ref<TableEntry | null>(null);
const renderFormModal = computed(() => !!props.matchweeks?.length);

async function onTableEntryClick(entry: TableEntry) {
  selectedTableEntry.value = null;
  await nextTick();
  selectedTableEntry.value = entry;
}

// Position size
const positionSize = ref('0px');

const onResizeObserver: ResizeObserverCallback = (entries) => {
  positionSize.value = `${entries[0]?.contentRect.width || 0}px`;
};

// Faded border size
const tableWrapperRef = useTemplateRef('table-wrapper');
const tableScroll = useScroll(tableWrapperRef);

const fadedBorderSize = ref('0px');

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
