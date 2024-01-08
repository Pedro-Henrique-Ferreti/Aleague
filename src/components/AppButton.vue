<template>
  <BaseButton
    class="button"
    :class="buttonClasses"
    :disabled="buttonIsDisabled"
    :to="to"
    :data-active="isActive"
    @click="$emit('click')"
  >
    <BaseIcon
      v-show="isLoading"
      class="button__loading-icon"
      icon="loading"
    />
    <template v-if="!isLoading">
      <div
        class="button__icon-wrapper"
        v-if="iconLeft"
      >
        <BaseIcon
          class="button__icon"
          :icon="iconLeft"
        />
      </div>
      <slot />
      <div
        class="button__icon-wrapper"
        v-if="iconRight"
      >
        <BaseIcon
          class="button__icon"
          :icon="iconRight"
        />
      </div>
    </template>
  </BaseButton>
</template>

<script lang="ts">
enum Colors {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  gray = 'gray',
  danger = 'danger',
  dangerGray = 'dangerGray',
  outline = 'outline',
}

enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import BaseButton from './common/BaseButton.vue';
import BaseIcon from './common/BaseIcon.vue';

defineEmits(['click']);

const slots = useSlots();

const props = defineProps({
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  color: {
    type: String as PropType<keyof typeof Colors>,
    default: Colors.primary,
    validator: (color: string) => {
      return (Object.values(Colors) as string[]).includes(color);
    },
  },
  size: {
    type: String as PropType<keyof typeof Sizes>,
    default: Sizes.medium,
    validator: (size: string) => {
      return (Object.values(Sizes) as string[]).includes(size);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  iconRounded: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const buttonIsDisabled = computed(() => props.isLoading || props.disabled);

const buttonClasses = computed(() => ({
  'button--primary': props.color === Colors.primary,
  'button--secondary': props.color === Colors.secondary,
  'button--tertiary': props.color === Colors.tertiary,
  'button--gray': props.color === Colors.gray,
  'button--danger': props.color === Colors.danger,
  'button--danger-gray': props.color === Colors.dangerGray,
  'button--outline': props.color === Colors.outline,
  'button--small': props.size === Sizes.small,
  'button--large': props.size === Sizes.large,
  'button--disabled': buttonIsDisabled.value,
  'button--icon-rounded': props.iconRounded,
  'button--icon-only': !slots.default,
}));
</script>

<style lang="scss" scoped>
.button {
  --color: #{$color--text-darken};
  --bg-color: transparent;
  --min-width: 7.5rem;
  --height: 2.75rem;
  --border-radius: 0.625rem;
  --gap: 0.875rem;
  --padding: 0 1rem;
  --icon-size: 1rem;
  --loading-icon-color: #{$color--white};
  --icon-bg-color: transparent;
  --hover-bg-color: transparent;
  --disabled-color:#{$color--text-darken};
  --disabled-bg-color: transparent;

  display: inline-flex;
  gap: var(--gap);
  justify-content: center;
  align-items: center;
  min-width: var(--min-width);
  height: var(--height);
  padding: var(--padding);
  color: var(--color);
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  transition:
    background-color $transition--fastest ease,
    color $transition--fastest ease-in-out;
  cursor: pointer;
  @include focus-ring;
  &:hover,
  &:active {
    background-color: var(--hover-bg-color);
  }

  &.button--disabled {
    pointer-events: none;
    color: var(--disabled-color);
    background-color: var(--disabled-bg-color);
  }
  &.button--primary {
    --bg-color: #{$color--primary};
    --icon-bg-color: #{$color--primary-400};
    --loading-icon-color: #{$color--text-darken};
    --hover-bg-color: #{$color--primary-400};
    --disabled-color: #{$color--text};
    --disabled-bg-color: #{$color--primary-300};
  }
  &.button--secondary {
    --bg-color: #{$color--secondary};
    --color: #{$color--white};
    --icon-bg-color: #{$color--secondary-400};
    --hover-bg-color: #{$color--secondary-400};
    --disabled-color: #{$color--white};
    --disabled-bg-color: #{$color--secondary-300};
  }
  &.button--tertiary {
    --bg-color: #{$color--tertiary};
    --color: #{$color--white};
    --icon-bg-color: #{$color--tertiary-400};
    --hover-bg-color: #{$color--tertiary-400};
    --disabled-color: #{$color--white};
    --disabled-bg-color: #{$color--tertiary-300};
  }
  &.button--gray {
    --bg-color: #{$color--light-gray-2};
    --loading-icon-color: #{$color--text-darken};
    --hover-bg-color: #{$color--light-gray-1};
    --disabled-color: #{$color--text-lighten};
    --disabled-bg-color: #{$color--light-gray-2};
  }
  &.button--danger {
    --bg-color: #{$color--danger};
    --color: #{$color--white};
    --hover-bg-color: #{$color--danger-400};
    --disabled-color: #{$color--white};
    --disabled-bg-color: #{$color--danger-400};
  }
  &.button--danger-gray {
    --bg-color: #{$color--light-gray-2};
    --color: #{$color--danger};
    --hover-bg-color: #{$color--light-gray-1};
    --disabled-color: #{$color--danger};
    --disabled-bg-color: #{$color--light-gray-2};
  }
  &.button--outline {
    border: 1px solid $color--light-gray-1;
    --hover-bg-color: #{$color--light-gray-2};
    --disabled-color: #{$color--text};
    &.button--icon-only {
      --color: #{$color--text-lighten};
      &[data-active="true"] {
        --bg-color: #{$color--light-gray-2};
        --color: #{$color--text-darken};
      }
    }
  }
  &.button--icon-only {
    --padding: 0 0.75rem;
    --min-width: unset;
    --icon-size: 1.25rem;
  }
  &.button--small {
    --min-width: 6.25rem;
    --height: 2rem;
    --border-radius: 0.375rem;
  }
  &.button--large {
    --height: 3rem;
  }
  &.button--icon-rounded {
    --gap: 0.75rem;
    --icon-size: 0.75rem;
    .button__icon-wrapper {
      justify-content: center;
      align-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background-color: var(--icon-bg-color);
    }
  }

  &__loading-icon {
    width: 1.75rem;
    height: 1.75rem;
    stroke: var(--loading-icon-color);
  }
  &__icon-wrapper {
    display: flex;
  }
  .button__icon {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--color);
    transition: fill $transition--fastest ease-in-out;
  }
}
</style>
