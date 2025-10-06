<template>
  <section class="card card-border overflow-hidden">
    <div class="card-body gap-0 p-1.25">
      <header class="flex justify-between">
        <div class="text-lg font-medium">{{ title }}</div>
        <AppButton
          v-if="showFilters"
          class="btn-square btn-ghost w-2 h-2"
          :icon-left="IconAdjustmentsHorizontal"
          @click="filtersVisible = !filtersVisible"
        />
      </header>
      <StandingsFilters
        v-if="showFilters"
        v-show="filtersVisible"
      />
      <div class="divider mt-0.5 -mb-[7px]" />
      <div class="table-container">
        <div
          ref="tableWrapperRef"
          class="overflow-x-auto"
        >
          <table class="table static">
            <tbody>
              <tr
                class="text-xs text-gray-500 bg-gray-1 [&_th]:p-0.75 [&_th]:text-center"
                key="header"
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
                <th class="min-w-3">%</th>
                <th>Recentes</th>
                <th />
              </tr>
              <tr
                v-for="entry, index in group.standings"
                class="bg-white h-3 hover:bg-gray-1 transition-colors duration-300 text-center [&_td]:px-0.75"
                :key="entry.id"
              >
                <td
                  v-resize-observer="onResizeObserver"
                  class="resize-observer p-0!"
                />
                <td
                  v-if="!entry.team"
                  class="h-3"
                  colspan="11"
                />
                <template v-else>
                  <td class="position bg-inherit h-[2.875rem] py-0">
                    <StandingsCardTeam
                      v-model:qualification="group.qualification[index]!"
                      :position="entry.position"
                      :team-id="entry.team"
                    />
                  </td>
                  <td class="font-semibold">{{ entry.points }}</td>
                  <td>{{ entry.played }}</td>
                  <td>{{ entry.won }}</td>
                  <td>{{ entry.drawn }}</td>
                  <td>{{ entry.lost }}</td>
                  <td>{{ entry.goalsFor }}</td>
                  <td>{{ entry.goalsAgainst }}</td>
                  <td>{{ entry.goalsFor - entry.goalsAgainst }}</td>
                  <td>{{ entry.played ? Math.round(entry.points / (entry.played * 3) * 100) : 0 }}%</td>
                  <td />
                </template>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ResizeObserverCallback } from '@vueuse/core';
import { vResizeObserver } from '@vueuse/components';
import { IconAdjustmentsHorizontal } from '@tabler/icons-vue';

defineProps<{
  title: string;
  showFilters?: boolean;
}>();

const group = defineModel<TournamentGroupsStage['groups'][number]>({ required: true });

const filtersVisible = ref(false);

// Position size
const positionSize = ref('0px');

const onResizeObserver: ResizeObserverCallback = (entries) => {
  positionSize.value = `${entries[0]?.contentRect.width || 0}px`;
}

const tableWrapperRef = useTemplateRef<HTMLDivElement>('tableWrapperRef');
const tableScroll = useScroll(tableWrapperRef);

const rightBorderSize = computed(() => {
  const clientWidth = tableWrapperRef.value?.clientWidth || 0;
  const scrollWidth = tableWrapperRef.value?.scrollWidth || 0;
  const scrollSize = scrollWidth - clientWidth;

  return `${scrollSize - tableScroll.x.value}px`;
});
</script>

<style scoped>
@reference '@/assets/css/main.css';

.table-container {
  @apply relative;
}
.table-container::after {
  width: v-bind(rightBorderSize);
  @apply content-[''] max-w-[2.25rem] h-[calc(100%-1rem)] bg-gradient-to-l from-white to-transparent absolute right-0 top-0 pointer-events-none;
}
.resize-observer {
  @apply min-w-16 w-[40%];
}
.position {
  width: v-bind(positionSize);
  @apply text-left absolute left-0;
}
</style>
