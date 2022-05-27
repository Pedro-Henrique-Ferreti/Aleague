<template>
  <component class="button"
    :is="componentTag"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script>
const validColors = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
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
});

const componentTag = computed(() => {
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
  'button--small': props.size === validSizes.small,
  'button--large': props.size === validSizes.large,
}));
</script>

<style lang="scss" scoped>
.button {
  --color: #{$color--text-darken};
  --background-color: transparent;
  --height: 2.75rem;

  height: var(--height);
  color: var(--color);
  background-color: var(--background-color);
  &--primary {
    --background-color: #{$color--primary};
    &:disabled {
      --color: #{$color--text};
      --background-color: #{$color--primary-lighten-2};
    }
  }
  &--small {
    --height: 2rem;
  }
  &--large {
    --height: 3rem;
  }
}
</style>
