<template>
  <AppModal
    v-model:is-open="isOpen"
    size="lg"
    :title="`Performance: ${getTeamById(entry?.team)?.name}`"
    :show-actions="false"
  >
    <StandingsFormList
      :key="`${entry?.team}-list`"
      :entry="entry"
    />
    <div class="font-semibold mt-2 mb-0.5">Posição por rodada</div>
    <StandingsFormChart
      v-if="chartData"
      :key="`${entry?.team}-chart`"
      :data="chartData"
      :lowest-y-point="standings.length"
    />
  </AppModal>
</template>

<script lang="ts" setup>
import { getTableEntriesByWeek } from '~/helpers/standings';
import type { Props as ChartProps } from './StandingsFormChart.vue';

const { getTeamById } = useTeamStore();

const props = defineProps<{
  standings: TournamentGroupsStage['groups'][number]['standings'];
  entry: TableEntry | null;
}>();

const isOpen = defineModel<boolean>('is-open');

// Chart data
const chartData = ref<ChartProps['data'] | null>(null);

// Open modal
watch(isOpen, () => {
  if (!isOpen.value) return;

  chartData.value = getTableEntriesByWeek(props.standings).flatMap((week) => {
    const index = week.entries.findIndex((i) => i.team === props.entry?.team);

    if (index === -1) return [];

    const teamEntry = week.entries[index]!;

    return {
      week: week.week,
      position: index + 1,
      result: teamEntry.form[teamEntry.form.length - 1]?.result ?? MatchResult.DRAW,
    };
  });
});
</script>
