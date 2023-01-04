<template>
  <div
    class="stepper-step"
    :class="{ 'stepper-step--complete': complete }"
  >
    <div class="stepper-step__icon-wrapper">
      <BaseIcon
        class="stepper-step__icon"
        :icon="complete ? 'check-circle' : 'warning-circle'"
      />
    </div>
    <span class="stepper-step__label">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  complete: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.stepper-step {
  --icon-color: #{$color--primary};
  --line-color: #{$color--light-gray-1};
  &--complete {
    --icon-color: #{$color--success-500};
    --line-color: #{$color--success-500};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 6rem;
  &__icon {
    width: 1rem;
    height: 1rem;
    fill: var(--icon-color);
  }
  &__label {
    display: inline-block;
    margin-top: 0.25rem;
    color: $color--text-darken;
    font-size: 0.875rem;
  }
  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  &:not(:first-of-type) .stepper-step__icon-wrapper {
    position: relative;
    &::before {
      content: '';
      display: block;
      width: calc(100% - 1rem);
      height: 0.125rem;
      background-color: var(--line-color);
      position: absolute;
      left: -41.7%;
    }
  }
}
</style>
