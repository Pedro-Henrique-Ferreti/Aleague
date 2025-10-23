<template>
  <canvas :id="id" />
</template>

<script lang="ts" setup>
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

const id = useId();

const props = defineProps<{
  config: ChartConfiguration,
}>();

onMounted(() => {
  const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');

  if (ctx) {
    const chart = new ChartJS(ctx, props.config);
    chart.render();
  }
});
</script>
