<template>
  <BaseButton
    class="button"
    :class="buttonClasses"
    :disabled="buttonIsDisabled"
    :to="to"
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
import { computed, type PropType } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';

defineEmits(['click']);

const props = defineProps({
  to: {
    type: [String, Object],
    default: '',
  },
  color: {
    type: String as PropType<keyof typeof Colors>,
    default: Colors.primary,
  },
  size: {
    type: String as PropType<keyof typeof Sizes>,
    default: Sizes.medium,
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
  --loading-icon-color: #{$color--white};
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
  transition:
    background-color $transition--fastest ease,
    color $transition--fastest ease-in-out;
  cursor: pointer;
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
    --loading-icon-color: #{$color--text-darken};
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
    --loading-icon-color: #{$color--text-darken};
    --hover-background-color: #{$color--light-gray-1};
    --disabled-color: #{$color--text-lighten};
    --disabled-background-color: #{$color--light-gray-2};
  }
  &.button--danger {
    --background-color: #{$color--danger};
    --color: #{$color--white};
    --hover-background-color: #{$color--danger-lighten-1};
    --disabled-color: #{$color--white};
    --disabled-background-color: #{$color--danger-lighten-1};
  }
  &.button--danger-gray {
    --background-color: #{$color--light-gray-2};
    --color: #{$color--danger};
    --hover-background-color: #{$color--light-gray-1};
    --disabled-color: #{$color--danger};
    --disabled-background-color: #{$color--light-gray-2};
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

  &__loading-icon {
    width: 1.75rem;
    height: 1.75rem;
    stroke: var(--loading-icon-color);
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
