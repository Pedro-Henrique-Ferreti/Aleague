<template>
  <div class="stepper">
    <div
      v-for="(step, index) in items"
      class="stepper__step"
      :key="index"
    >
      <span>{{ step.name }}</span>
      <TransitionFade>
        <IconSuccess
          v-if="step.isCompleted"
          class="stepper__step-icon"
        />
        <span
          v-else
          v-text="index + 1"
          class="stepper__step-number"
        />
      </TransitionFade>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ProgressStepperStep } from '@/types/ProgressStepper';
import IconSuccess from '@/assets/icons/IconSuccess.svg';
import TransitionFade from './TransitionFade.vue';

defineProps({
  items: {
    type: Array as PropType<ProgressStepperStep[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  &__step {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: $color--text-strong;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
    &:not(:first-child)::before {
      content: '';
      width: 2.5rem;
      height: 0.1875rem;
      margin-right: 0.5rem;
      background-color: $color--neutral-300;
      border-radius: $radius--full;
    }
  }
  &__step-number {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    background-color: $color--neutral-300;
    border-radius: $radius--full;
    color: $color--primary;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
  }
  &__step-icon {
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    color: $color--success;
    box-shadow: 0 0 4px 0 #00b87e3d;
    border-radius: $radius--full;
  }
}
</style>
