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
  --background-color: #{$color--white};
  --border-color: #{$color--white};
  --icon-color: #{$color--white};
  &--success {
    --background-color: #{$color--success-lighten-4};
    --border-color: #{$color--success};
    --icon-color: #{$color--success-darken-2};
  }
  &--error {
    --background-color: #{$color--danger-lighten-4};
    --border-color: #{$color--danger-lighten-1};
    --icon-color: #{$color--danger};
  }

  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.75rem 0;
  padding-left: 0.625rem;
  padding-right: 1rem;
  background-color: var(--background-color);
  border-radius: 0.375rem;
  border-left: 0.375rem solid var(--border-color);
  position: relative;
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--icon-color);
  }
  &__content {
    margin-right: 2rem;
    * {
      color: $color--text-darken;
      font-weight: $font-weight--medium;
    }
  }
  &__close-button {
    @include focus-ring;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    position: absolute !important;
    right: 0.5rem;
    transition: background-color $transition--fastest ease-in-out;
    &:hover {
      background-color: #{$color--white}BF;
    }
  }
  &__close-button-icon {
    width: 0.625rem;
    height: 0.625rem;
    fill: $color--text;
  }
}
</style>
