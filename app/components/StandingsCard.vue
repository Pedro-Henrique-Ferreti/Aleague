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
                <th class="points">
                  <span class="desktop:hidden">Pts</span>
                  <span class="max-desktop:hidden">Pontos</span>
                </th>
                <th>
                  <span class="desktop:hidden">J</span>
                  <span class="max-desktop:hidden">Jogos</span>
                </th>
                <th>
                  <span class="desktop:hidden">V</span>
                  <span class="max-desktop:hidden">Vitórias</span>
                </th>
                <th>
                  <span class="desktop:hidden">E</span>
                  <span class="max-desktop:hidden">Empates</span>
                </th>
                <th>
                  <span class="desktop:hidden">D</span>
                  <span class="max-desktop:hidden">Derrotas</span>
                </th>
                <th>GP</th>
                <th>GC</th>
                <th>SG</th>
                <th>%</th>
                <th>Recentes</th>
                <th />
              </tr>
              <tr
                v-for="entry in standings"
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
                      :position="entry.position"
                      :team="entry.team"
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
  standings: StandingsEntry[];
  showFilters?: boolean;
}>();

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
