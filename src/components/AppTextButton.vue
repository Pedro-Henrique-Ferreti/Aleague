<template>
  <BaseButton
    class="text-button"
    :disabled="disabled"
    :to="to"
    :data-loading="isLoading"
    @click="handleClick"
  >
    <div class="text-button__content">
      <slot />
    </div>
    <IconSpinner
      v-if="isLoading"
      class="text-button__icon-loader"
      size="16"
    />
  </BaseButton>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import IconSpinner from './icons/IconSpinner.vue';
import BaseButton from './BaseButton.vue';

const emit = defineEmits(['click']);
const props = defineProps({
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

function handleClick(event: Event) {
  if (props.isLoading) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}
</script>

<style lang="scss" scoped>
.text-button {
  --text-color: #{$color--primary-800};
  --hover-text-color: #{$color--primary-900};
  --disabled-text-color: #{$color--text};
  --loader-indicator-color: #{$color--primary-800};

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-weight: $font-weight--medium;
  font-size: 0.875rem;
  transition: all $transition--fast ease-in;
  outline-offset: 0.25rem;
  cursor: pointer;
  &:hover:not([data-loading="true"]) {
    text-decoration: underline;
  }
  &:disabled {
    color: var(--disabled-text-color, var(--text-color));
    pointer-events: none;
  }
  &__icon-loader {
    --track-color: transparent;
    --indicator-color: var(--loader-indicator-color);
    fill: currentColor;
  }
  &__icon-wrapper :deep(svg) {
    fill: currentColor;
  }
  &__icon-left {
    transform: rotate(180deg);
  }
}
</style>
