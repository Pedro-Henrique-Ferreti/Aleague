<template>
  <div class="phase-toggle">
    <button
      class="phase-toggle__button"
      :disabled="disablePreviousButton"
      @click="$emit('previous-phase')"
    >
      <div class="phase-toggle__button-icon-wrapper">
        <BaseIcon
          class="phase-toggle__button-icon phase-toggle__button-icon--left"
          icon="chevron"
        />
      </div>
      <span>Fase anterior</span>
    </button>
    <button
      class="phase-toggle__button"
      :disabled="disableNextButton"
      @click="$emit('next-phase')"
    >
      <span>Próxima fase</span>
      <div class="phase-toggle__button-icon-wrapper">
        <BaseIcon
          class="phase-toggle__button-icon"
          icon="chevron"
        />
      </div>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['previous-phase', 'next-phase']);
defineProps({
  disablePreviousButton: {
    type: Boolean,
    default: false,
  },
  disableNextButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.phase-toggle {
  display: flex;
  justify-content: space-between;
  width: 100%;
  @include for-tablet-portrait-up {
    gap: 2.5rem;
    justify-content: center;
  }
  &__button {
    --icon-background-color: transparent;
    @include focus-ring;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: $font-weight--semibold;
    cursor: pointer;
    &:hover:not(:disabled) {
      --icon-background-color: #{$color--light-gray-2};
    }
    &:disabled {
      color: $color--text-lighten;
      cursor: default;
    }
  }
  &__button-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: var(--icon-background-color);
    border: 1px solid $color--light-gray-1;
    border-radius: 0.25rem;
    transition: background-color $transition--fastest ease-in-out;
  }
  &__button-icon {
    width: 0.6rem;
    fill: $color--primary;
    transform: translateX(1px);
    &--left {
      transform: rotate(180deg) translateX(1px);
    }
  }
}
</style>
