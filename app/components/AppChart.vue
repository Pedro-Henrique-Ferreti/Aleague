<template>
  <canvas :id="id" />
</template>

<script lang="ts" setup>
import {
  CategoryScale,
  type ChartConfiguration,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

const props = defineProps<{
  config: ChartConfiguration,
}>();

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

onMounted(() => {
  const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');

  if (ctx) {
    const chart = new ChartJS(ctx, props.config);
    chart.render();
  }
});
</script>
