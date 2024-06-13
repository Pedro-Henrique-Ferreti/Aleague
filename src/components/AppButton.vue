<template>
  <BaseButton
    class="button"
    :disabled="disabled"
    :to="to"
    :data-disabled="disabled"
    :data-color="color"
    :data-outline="outline"
    :data-loading="isLoading"
    @click="handleClick"
  >
    <div class="button__content-wrapper">
      <div class="button__content">
        <span class="button__icon button__icon--left">
          <slot name="icon-left" />
        </span>
        <slot />
        <span class="button__icon">
          <slot name="icon" />
        </span>
      </div>
      <IconSpinner
        class="button__icon-loader"
        size="24"
      />
    </div>
  </BaseButton>
</template>

<script lang="ts">
type ValueOf<T> = T[keyof T];

const Colors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  DANGER_HIGH_EMPHASIS: 'danger-high-emphasis',
  SECONDARY_DARK: 'secondary-dark',
  SUCCESS: 'success',
} as const;
</script>

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
  outline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String as PropType<ValueOf<typeof Colors>>,
    default: Colors.PRIMARY,
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
.button {
  --height: 2.75rem;
  --loader-indicator-color: #{$color--text-strong};

  &[data-loading="true"] {
    cursor: default;
    .button__icon-loader,
    .button__content {
      transform: translateY(calc(var(--height) * -1));
    }
  }

  display: inline-block;
  width: fit-content;
  height: var(--height);
  padding: 0 1.5rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: $radius--full;
  font-weight: $font-weight--medium;
  font-size: 0.875rem;
  outline-offset: 0.25rem;
  cursor: pointer;
  transition:
    background-color $transition--fast ease-in,
    color $transition--fast ease-in,
    border-color $transition--fast ease-in;
  &:hover:not([data-loading="true"]) {
    background-color: var(--hover-bg-color, var(--bg-color));
    color: var(--hover-text-color, var(--text-color));
  }
  &[data-disabled="true"] {
    background-color: var(--disabled-bg-color, var(--bg-color));
    color: var(--disabled-text-color, var(--text-color));
    pointer-events: none;
  }
  &[data-outline="true"] {
    background-color: transparent;
    border: 1px solid var(--border-color);
    &:hover:not([data-loading="true"]) {
      border-color: var(--hover-border-color, var(--border-color));
    }
    &[data-disabled="true"] {
      border-color: var(--disabled-border-color, var(--border-color));
    }
  }
  &__content-wrapper {
    height: 100%;
    overflow: hidden;
  }
  &__icon-loader {
    --track-color: transparent;
    --indicator-color: var(--loader-indicator-color);
  }
  &__icon-loader,
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: $transition--1;
  }
  &__icon {
    display: flex;
    align-items: center;
    margin-left: 0.625rem;
    &:empty {
      display: none;
    }
    &--left {
      margin-right: 0.625rem;
      margin-left: 0;
    }
    :deep(svg) {
      width: auto;
      height: 1rem;
      fill: currentColor;
    }
  }

  &[data-outline="false"] {
    --disabled-bg-color: #{$color--text-200};
    --disabled-text-color: #{$color--text};
    &[data-color="primary"] {
      --bg-color: #{$color--primary};
      --text-color: #{$color--text-strong};
      --hover-bg-color: #{$color--primary-800};
    }
    &[data-color="secondary"] {
      --bg-color: #{$color--neutral-100};
      --text-color: #{$color--primary-800};
      --loader-indicator-color: #{$color--primary-800};
    }
    &[data-color="danger"] {
      --bg-color: #{$color--danger-100};
      --text-color: #{$color--danger};
      --hover-bg-color: #{$color--danger-200};
      --loader-indicator-color: #{$color--danger};
    }
    &[data-color="danger-high-emphasis"] {
      --bg-color: #{$color--danger};
      --text-color: #{$color--white};
      --hover-bg-color: #{$color--danger-600};
      --loader-indicator-color: #{$color--white};
    }
  }
  &[data-outline="true"] {
    --text-color: #{$color--text-strong};
    --border-color: #{$color--neutral-300};
    --hover-bg-color: #{$color--neutral-200};
    --disabled-text-color: #{$color--text};
  }
}
</style>
