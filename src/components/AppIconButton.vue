<template>
  <BaseButton
    class="button"
    :disabled="disabled"
    :to="to"
    :data-disabled="disabled"
    :data-loading="isLoading"
    :data-size="size"
    :data-color="color"
    @click="handleClick"
  >
    <div class="button__content-wrapper">
      <span class="button__icon">
        <slot name="icon-right">
          <component
            v-if="icon"
            :is="icon"
          />
        </slot>
      </span>
      <IconSpinner
        class="button__icon-loader"
        :size="!!size ? '14' : '16'"
      />
    </div>
  </BaseButton>
</template>

<script lang="ts">
const Colors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  SECONDARY_DARK: 'secondary-dark',
} as const;

const Sizes = {
  SMALL: 'small',
  EXTRA_SMALL: 'extra-small',
} as const;
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { ValueOf } from '@/types/Auth';
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
  size: {
    type: String as PropType<ValueOf<typeof Sizes>>,
    default: '',
  },
  color: {
    type: String as PropType<ValueOf<typeof Colors>>,
    default: Colors.PRIMARY,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: null,
    required: true,
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
  --size: 2.75rem;
  --icon-size: 1rem;
  --loader-indicator-color: #{$color--text-strong};
  &[data-size="small"] {
    --size: 2.25rem;
    --icon-size: 0.875rem;
  }
  &[data-size="extra-small"] {
    --size: 2rem;
    --icon-size: 0.875rem;
  }
  &[data-loading="true"] {
    cursor: default;
    .button__icon-loader,
    .button__icon {
      transform: translateY(calc(var(--size) * -1));
    }
  }

  display: inline-block;
  width: var(--size);
  height: var(--size);
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: $radius--full;
  outline-color: $color--focus-ring;
  outline-offset: 0.25rem;
  cursor: pointer;
  transition:
    background-color $transition--fast ease-in,
    color $transition--fast ease-in;
  &:hover:not([data-loading="true"]) {
    background-color: var(--hover-bg-color, var(--bg-color));
    color: var(--hover-text-color, var(--text-color));
  }
  &[data-disabled="true"] {
    background-color: var(--disabled-bg-color, var(--bg-color));
    color: var(--disabled-text-color, var(--text-color));
    pointer-events: none;
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
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: $transition--1;
  }
  &__icon {
    :deep(svg) {
      width: auto;
      height: var(--icon-size);
      fill: currentColor;
    }
  }

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
    --hover-text-color: #{$color--primary-900};
  }
  &[data-color="secondary-dark"] {
    --bg-color: #{$color--neutral-100};
    --text-color: #{$color--black};
    --loader-indicator-color: #{$color--black};
  }
  &[data-color="danger"] {
    --bg-color: #{$color--danger-100};
    --text-color: #{$color--danger};
    --hover-bg-color: #{$color--danger-200};
    --loader-indicator-color: #{$color--danger};
  }
}
</style>
