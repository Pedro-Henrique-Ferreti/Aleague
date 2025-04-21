<template>
  <canvas :id="elementId" />
</template>

<script lang="ts" setup>
import { onMounted, useId } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  type ChartConfiguration,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
);

const elementId = useId();

const props = defineProps<{
  config: ChartConfiguration,
}>();

onMounted(() => {
  const ctx = (document.getElementById(elementId) as HTMLCanvasElement).getContext('2d');

  if (ctx) {
    const chart = new ChartJS(ctx, props.config);
    chart.render();
  }
});
</script>
