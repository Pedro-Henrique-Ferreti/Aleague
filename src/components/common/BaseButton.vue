<template>
  <component class="button"
    :is="componentTag"
    :class="buttonClasses"
    :disabled="componentTag === 'button' ? disabled : null"
    :target="componentTag === 'a' ? '_blank' : null"
    :rel="componentTag === 'a' ? 'noopener' : null"
  >
    <slot />
  </component>
</template>

<script>
const validColors = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  gray: 'gray',
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
  outline: {
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
  'button--small': props.size === validSizes.small,
  'button--large': props.size === validSizes.large,
  'button--outline': props.outline,
  'button--disabled': props.disabled,
}));
</script>

<style lang="scss" scoped>
.button {
  --color: #{$color--text-darken};
  --background-color: transparent;
  --min-width: 7.5rem;
  --height: 2.75rem;
  --border-radius: 0.5rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: var(--min-width);
  height: var(--height);
  padding: 0 1rem;
  color: var(--color);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  @include focus-ring;

  &.button--disabled {
    pointer-events: none;
  }
  &.button--primary {
    --background-color: #{$color--primary};
    &.button--disabled {
      --color: #{$color--text};
      --background-color: #{$color--primary-lighten-2};
    }
  }
  &.button--secondary {
    --background-color: #{$color--secondary};
    --color: #{$color--white};
  }
  &.button--small {
    --min-width: 6.25rem;
    --height: 2rem;
    --border-radius: 0.375rem;
  }
  &.button--large {
    --height: 3rem;
  }
}
</style>
