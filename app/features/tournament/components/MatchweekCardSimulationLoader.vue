<template>
  <div
    v-if="matchweekCardStore.isSimulatingResults"
    class="absolute inset-0 z-1 flex flex-col justify-center items-center gap-1 bg-white/75 text-sm font-semibold p-1.25"
  >
    <AppProgress :value="simulationProgress" />
    <span>Simulando resultados... {{ simulationProgress }}%</span>
  </div>
</template>

<script lang="ts" setup>
const matchweekCardStore = useMatchweekCardStore();

const simulationProgress = computed(() => {
  const { simulated, total } = matchweekCardStore.matchesToSimulateCount;
  return Math.round((simulated / total) * 100);
});
</script>
