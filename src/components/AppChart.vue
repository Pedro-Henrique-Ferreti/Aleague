<template>
  <canvas :id="id" />
</template>

<script lang="ts" setup>
import { onMounted, type PropType } from 'vue';
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

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  config: {
    type: Object as PropType<ChartConfiguration>,
    required: true,
  },
});

onMounted(() => {
  const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d');

  if (ctx) {
    const chart = new ChartJS(ctx, props.config);
    chart.render();
  }
});
</script>
