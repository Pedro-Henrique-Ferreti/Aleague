<template>
  <AppChart :config="chartConfig" />
</template>

<script lang="ts">
export interface Props {
  data: {
    week: number;
    position: number;
    result: MatchResult;
  }[];
  lowestYPoint: number;
}
</script>

<script lang="ts" setup>
import type { ChartConfiguration } from 'chart.js';

const props = defineProps<Props>();

const yAxisStepSize = computed(() => {
  if (props.lowestYPoint <= 4) return 1;
  if (props.lowestYPoint <= 10) return 3;
  if (props.lowestYPoint <= 16) return 4;
  if (props.lowestYPoint <= 20) return 5;

  return 6;
});

const chartConfig = computed<ChartConfiguration>(() => ({
  type: 'line',
  data: {
    labels: props.data.map((i) => i.week),
    datasets: [{
      data: props.data.map((i) => i.position),
      borderColor: '#D1D1D1',
      borderWidth: 2,
      tension: 0.1,
      pointRadius: 6,
      pointBackgroundColor: props.data.map((i) => {
        if (i.result === MatchResult.WON) return '#008236';
        return i.result === MatchResult.LOST ? '#E73737' : '#99a1af';
      }),
      pointBorderColor: '#FFF',
      pointHoverRadius: 6,
    }],
  },
  options: {
    responsive: true,
    clip: false,
    aspectRatio: 5.25 / 2,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        title: {
          display: true,
          text: 'Rodada',
          color: '#333c4d',
        },
      },
      y: {
        reverse: true,
        position: 'left',
        min: 1,
        max: props.lowestYPoint,
        grid: { drawTicks: false },
        ticks: { padding: 12, stepSize: yAxisStepSize.value },
        border: { display: false },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (tooltips) => tooltips.map(({ label }) => `Rodada ${label}`),
          label: (tooltip) => `Pos: ${tooltip.formattedValue}`,
        },
      },
    },
  },
}));
</script>
