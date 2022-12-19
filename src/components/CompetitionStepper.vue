<template>
  <div class="competition-stepper">
    <CompetitionStepperStep
      v-for="step in STEPS"
      :class="{ 'stepper--hidden': step.number !== currentStep }"
      :key="step.number"
      :step="step.number.toString()"
      :is-active="step.number === currentStep"
      :is-complete="step.number < currentStep"
    >
      {{ step.name }}
    </CompetitionStepperStep>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import CompetitionStepperStep from './CompetitionStepperStep.vue';

const STEPS = [
  { number: 1, name: 'Nome e formato' },
  { number: 2, name: 'Definir regras' },
  { number: 3, name: 'Adicionar participantes' },
];

defineProps({
  currentStep: {
    type: Number as PropType<1 | 2 | 3>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.competition-stepper {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
  @include for-large-tablet-portrait-down {
    .stepper--hidden {
      display: none;
    }
  }
  @include for-large-tablet-portrait-up {
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 3rem;
  }
}
</style>
