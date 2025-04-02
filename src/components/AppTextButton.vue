<template>
  <BaseButton
    class="text-button"
    :disabled="disabled"
    :to="to"
    :data-color="color"
    :data-loading="isLoading"
    @click="handleClick"
  >
    <IconSpinner
      v-if="isLoading && iconLeft"
      class="text-button__icon-loader"
      size="14"
    />
    <component
      v-else-if="iconLeft"
      class="text-button__icon"
      :is="iconLeft"
    />
    <div class="text-button__content">
      <slot />
    </div>
    <IconSpinner
      v-if="isLoading && !iconLeft"
      class="text-button__icon-loader"
      size="14"
    />
  </BaseButton>
</template>

<script lang="ts">
const Colors = {
  PRIMARY: 'primary',
  BLUE: 'blue',
} as const;
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { ValueOf } from '@/types/Auth';
import IconSpinner from './IconSpinner.vue';
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
  color: {
    type: String as PropType<ValueOf<typeof Colors>>,
    default: Colors.PRIMARY,
  },
  iconLeft: {
    type: null,
    default: () => null,
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
  --loader-indicator-color: #{$color--primary-800};
  --disabled-text-color: #{$color--text};
  &[data-color="blue"] {
    --text-color: #{$color--blue-800};
    --loader-indicator-color: #{$color--blue-800};
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  color: var(--text-color);
  font-weight: $font-weight--medium;
  font-size: 0.875rem;
  transition: all $transition--fast ease-in;
  outline-color: $color--focus-ring;
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
  &__icon {
    width: auto;
    height: 0.875rem;
    fill: currentColor;
  }
}
</style>
