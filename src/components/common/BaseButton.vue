<template>
  <component
    class="button"
    :is="componentTag"
    :class="buttonClasses"
    :disabled="componentTag === 'button' ? disabled : null"
    :target="componentTag === 'a' ? '_blank' : null"
    :rel="componentTag === 'a' ? 'noopener' : null"
    @click="$emit('click')"
  >
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
  </component>
</template>

<script>
const validColors = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  gray: 'gray',
  danger: 'danger',
  outline: 'outline',
};

const validSizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export default {};
</script>

<script setup>
import { computed } from 'vue';

defineEmits(['click']);

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: validColors.primary,
    validator:(color) => Object.values(validColors).includes(color),
  },
  size: {
    type: String,
    default: validSizes.medium,
    validator:(size) => Object.values(validSizes).includes(size),
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
});

const componentTag = computed(() => {
  /**
   * Returns a button tag to prevent disabled elements
   * from being activated by tab + enter commands.
   */
  if (props.disabled) {
    return 'button';
  }

  switch (props.type) {
    case 'link':
      return 'router-link';
    case 'externalLink':
      return 'a';
    default:
      return 'button';
  }
});

const buttonClasses = computed(() => ({
  'button--primary': props.color === validColors.primary,
  'button--secondary': props.color === validColors.secondary,
  'button--tertiary': props.color === validColors.tertiary,
  'button--gray': props.color === validColors.gray,
  'button--danger': props.color === validColors.danger,
  'button--small': props.size === validSizes.small,
  'button--large': props.size === validSizes.large,
  'button--outline': props.color === validColors.outline,
  'button--disabled': props.disabled,
  'button--icon-rounded': props.iconRounded,
}));
</script>

<style lang="scss" scoped>
.button {
  --color: #{$color--text-darken};
  --background-color: transparent;
  --min-width: 7.5rem;
  --height: 2.75rem;
  --border-radius: 0.5rem;
  --gap: 0.875rem;
  --icon-width: 1rem;
  --icon-background-color: transparent;
  --hover-background-color: transparent;
  --disabled-color:#{$color--text-darken};
  --disabled-background-color: transparent;

  display: inline-flex;
  gap: var(--gap);
  justify-content: center;
  align-items: center;
  min-width: var(--min-width);
  height: var(--height);
  padding: 0 1rem;
  color: var(--color);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  transition: background-color $transition--fastest ease;
  @include focus-ring;
  &:hover,
  &:active {
    background-color: var(--hover-background-color);
  }

  &.button--disabled {
    pointer-events: none;
    color: var(--disabled-color);
    background-color: var(--disabled-background-color);
  }
  &.button--primary {
    --background-color: #{$color--primary};
    --icon-background-color: #{$color--primary-lighten-1};
    --hover-background-color: #{$color--primary-lighten-1};
    --disabled-color: #{$color--text};
    --disabled-background-color: #{$color--primary-lighten-2};
  }
  &.button--secondary {
    --background-color: #{$color--secondary};
    --color: #{$color--white};
    --icon-background-color: #{$color--secondary-lighten-1};
    --hover-background-color: #{$color--secondary-lighten-1};
    --disabled-color: #{$color--white};
    --disabled-background-color: #{$color--secondary-lighten-2};
  }
  &.button--tertiary {
    --background-color: #{$color--tertiary};
    --color: #{$color--white};
    --icon-background-color: #{$color--tertiary-lighten-1};
    --hover-background-color: #{$color--tertiary-lighten-1};
    --disabled-color: #{$color--white};
    --disabled-background-color: #{$color--tertiary-lighten-2};
  }
  &.button--gray {
    --background-color: #{$color--light-gray-2};
    --hover-background-color: #{$color--light-gray-1};
    --disabled-color: #{$color--text};
    --disabled-background-color: #{$color--light-gray-2};
  }
  &.button--danger {
    --background-color: #{$color--danger};
    --color: #{$color--white};
    --hover-background-color: #{$color--danger-lighten-1};
    --disabled-color: #{$color--white};
    --disabled-background-color: #{$color--danger-lighten-1};
  }
  &.button--outline {
    border: 1px solid $color--light-gray-1;
    --color: #{$color--text};
    --hover-background-color: #{$color--light-gray-2};
    --disabled-color: #{$color--text};
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
    --gap: 0.5rem;
    --icon-width: 0.75rem;
    .button__icon-wrapper {
      justify-content: center;
      align-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background-color: var(--icon-background-color);
    }
  }

  &__icon-wrapper {
    display: flex;
  }
  .button__icon {
    width: var(--icon-width);
    fill: var(--color);
  }
}
</style>
