<template>
  <div
    class="competition-step"
    :class="stepperClasses"
  >
    <div class="competition-step__content">
      <BaseIcon
        v-if="isComplete"
        class="competition-step__check-icon"
        icon="check-circle"
      />
      <span
        v-else
        class="competition-step__number"
      >
        {{ step }}
      </span>
      <span class="competition-step__label">
        <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  step: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const stepperClasses = computed(() => ({
  'competition-step--active': props.isActive,
  'competition-step--completed': props.isComplete,
}));
</script>

<style lang="scss" scoped>
.competition-step {
  --label-color: #{$color--text-lighten};
  --border-color: #{$color--text-lighten};
  --number-background: #{$color--light-gray-1};
  --number-color: #{$color--secondary};
  &--active {
    --label-color: #{$color--text-darken};
    --border-color: #{$color--secondary};
    --number-background: #{$color--secondary};
    --number-color: #{$color--white};
  }
  &--completed {
    --label-color: #{$color--text-darken};
    --border-color: #{$color--success-darken-2};
    --number-color: #{$color--white};
  }

  &__content {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
  &__number {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: var(--number-color);
    background-color: var(--number-background);
    font-size: 0.875rem;
    font-weight: $font-weight--semibold;
  }
  &__check-icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: $color--success-darken-2;
  }
  &__label {
    color: var(--label-color);
    font-size: 1.125rem;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 0.25rem;
    margin-top: 0.5rem;
    background-color: var(--border-color);
    border-top-left-radius: 0.125rem;
    border-top-right-radius: 0.125rem;
  }
}
</style>
