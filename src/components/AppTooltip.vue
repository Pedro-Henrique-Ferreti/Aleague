<template>
  <div
    class="tooltip-wrapper"
    tabindex="0"
  >
    <div
      class="app-tooltip"
      role="tooltip"
    >
      <div class="app-tooltip__content">
        <slot name="tooltip-content" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.tooltip-wrapper {
  @include focus-ring($apply-position: false);
  display: inline-block;
  position: relative;
  &:hover,
  &:focus {
    .app-tooltip {
      opacity: 1;
      clip: auto;
    }
  }
}
.app-tooltip {
  width: max-content;
  background-color: $color--white;
  border-radius: 0.5rem;
  opacity: 0;
  box-shadow: $shadow--medium;
  position: absolute;
  bottom: calc(100% + 0.5rem);
  right: -1rem;
  z-index: 1;
  transition: all $transition--fastest ease-in;
  clip: rect(0 0 0 0);
  &::after {
    content: '';
    display: block;
    border: 0.75rem solid transparent;
    border-top-color: $color--white;
    position: absolute;
    bottom: -1.25rem;
    left: auto;
    right: 0.75rem;
  }
  &__content {
    padding: 0.75rem;
  }
}
</style>
