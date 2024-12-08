<template>
  <span
    class="app-chip"
    :data-size="size"
    :data-color="color"
    :data-rounded="rounded"
  >
    <slot name="icon-left">
      <component
        v-if="iconLeft"
        :is="iconLeft"
      />
    </slot>
    <span>
      <slot>{{ text }}</slot>
    </span>
    <button
      v-if="removable"
      class="app-chip__remove-button"
      type="button"
      @click="$emit('remove')"
    >
      <IconClose class="app-chip__remove-button-icon" />
    </button>
  </span>
</template>

<script lang="ts">
enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
enum Colors {
  primary = 'primary',
  blue = 'blue',
  danger = 'danger',
  success = 'success',
}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import IconClose from '@/assets/icons/Close.svg';

defineEmits(['remove']);
defineProps({
  size: {
    type: String as PropType<keyof typeof Sizes>,
    default: Sizes.medium,
  },
  color: {
    type: String as PropType<keyof typeof Colors>,
    default: '',
  },
  removable: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  iconLeft: {
    type: null,
    default: () => null,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.app-chip {
  --bg-color: #{$color--neutral-100};
  --text-color: #{$color--text};
  &[data-size="large"] {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
  }
  &[data-size="small"] {
    padding: 0 0.125rem;
    font-size: 0.75rem;
  }
  &[data-rounded="false"] {
    --border-radius: #{$radius--small};
  }
  &[data-color="primary"] {
    --bg-color: #{$color--primary-100};
    --text-color: #{$color--primary-800};
  }
  &[data-color="blue"] {
    --bg-color: #{$color--blue-100};
    --text-color: #{$color--blue};
  }
  &[data-color="danger"] {
    --bg-color: #{$color--danger-100};
    --text-color: #{$color--danger};
  }
  &[data-color="success"] {
    --bg-color: #{$color--success-100};
    --text-color: #{$color--success-600};
  }
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 0.5rem;
  padding: 0.125rem 0.375rem;
  background-color: var(--bg-color);
  border-radius: var(--border-radius, #{$radius--full});
  color: var(--text-color);
  font-size: 0.875rem;
  > :deep(svg),
  > :deep(img) {
    width: auto;
    height: 1em;
    fill: currentColor;
  }
  &__remove-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius--full;
    transition: background-color $transition--fastest linear;
    outline-offset: 0.125rem;
    &:hover {
      background-color: $color--white;
    }
  }
  &__remove-button-icon {
    width: 0.75rem;
    height: 0.75rem;
  }
}
</style>
