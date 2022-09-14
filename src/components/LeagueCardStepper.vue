<template>
  <div class="league-card-stepper">
    <LeagueCardStepperStep
      v-for="(step, index) in steps"
      :key="index"
      :complete="step.complete"
    >
      {{ step.name }}
    </LeagueCardStepperStep>
  </div>
</template>

<script lang="ts">
interface StepperStep {
  name: string;
  complete: boolean;
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import LeagueCardStepperStep from './LeagueCardStepperStep.vue';

defineProps({
  steps: {
    type: Array as PropType<StepperStep[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.league-card-stepper {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;
}
</style>
