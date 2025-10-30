<template>
  <AppModal
    v-model:is-open="isOpen"
    size="lg"
    :title="`Performance: ${getTeamById(entry?.team)?.name}`"
    :show-actions="false"
  >
    <div class="font-semibold mb-0.5">Sequência</div>
    <swiper-container
      space-between="16"
      free-mode="true"
      slides-per-view="auto"
    >
      <swiper-slide
        v-for="form in entry?.form"
        :key="form.match.id"
        class="w-max last:mr-0!"
        data-allow-mismatch="class"
      >
        <StandingsFormItem
          class="min-h-7"
          :form="form"
          :team-id="entry?.team || null"
        />
      </swiper-slide>
    </swiper-container>
    <div class="font-semibold mt-2 mb-0.5">Posição por rodada</div>
    <StandingsFormChart
      v-if="chartData"
      :key="entry?.team || ''"
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
