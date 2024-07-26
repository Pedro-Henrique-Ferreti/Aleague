<template>
  <div class="stepper">
    <swiper-container
      free-mode="true"
      slides-per-view="auto"
    >
      <swiper-slide
        v-for="(step, index) in items"
        :key="index"
      >
        <div class="stepper__step">
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
      </swiper-slide>
    </swiper-container>
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
  swiper-container {
    max-width: fit-content;
    margin: 0 auto;
  }
  swiper-slide {
    width: max-content;
    &:not(:first-child) .stepper__step {
      margin-left: 0.75rem;
      &::before {
        content: '';
        width: 2.5rem;
        height: 0.1875rem;
        margin-right: 0.5rem;
        background-color: $color--neutral-300;
        border-radius: $radius--full;
      }
    }
  }
  &__step {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: $color--text-strong;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
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
