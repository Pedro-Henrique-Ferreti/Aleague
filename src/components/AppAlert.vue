<template>
  <div
    class="alert"
    role="alert"
    :class="alertClasses"
  >
    <BaseIcon
      class="alert__icon"
      :icon="alertIcon"
    />
    <div class="alert__content">
      <p>{{ message }}</p>
    </div>
    <button
      class="alert__close-button"
      type="button"
      aria-label="Close alert"
      @click="$emit('close')"
    >
      <BaseIcon
        class="alert__close-button-icon"
        icon="close"
      />
    </button>
  </div>
</template>

<script lang="ts">
enum Types {
  success = 'success',
  error = 'error',
}
</script>

<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import BaseIcon from './common/BaseIcon.vue';

defineEmits(['close']);
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<keyof typeof Types>,
    default: Types.success,
  },
});

const alertClasses = computed(() => ({
  'alert--success': props.type === Types.success,
  'alert--error': props.type === Types.error,
}));

const alertIcon = computed(() => {
  switch (props.type) {
    case Types.success:
      return 'check-circle';
    default:
      return 'error-circle';
  }
});
</script>

<style lang="scss" scoped>
.alert {
  --background-color: none;
  --border-color: none;
  --icon-color: none;
  &--success {
    --background-color: #{$color--success-100};
    --border-color: #{$color--success-600};
    --icon-color: #{$color--success-600};
  }
  &--error {
    --background-color: #{$color--danger-100};
    --border-color: #{$color--danger};
    --icon-color: #{$color--danger};
  }

  display: flex;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.5rem;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 0.625rem;
  &::before {
    content: '';
    flex-shrink: 0;
    width: 2px;
    height: 100%;
    margin-right: 0.5rem;
    background-color: var(--border-color);
    border-radius: 0.5rem;
  }
  &__icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--icon-color);
  }
  &__content {
    margin: 0.5rem 1rem;
    color: $color--text-darken;
    font-weight: $font-weight--semibold;
  }
  &__close-button {
    @include focus-ring;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin-left: auto;
    border-radius: 0.5rem;
    transition: background-color $transition--fastest ease-in-out;
    &:hover {
      background-color: get-hexadecimal-transparency($color--white, 85);
    }
  }
  &__close-button-icon {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--icon-color);
  }
}
</style>
