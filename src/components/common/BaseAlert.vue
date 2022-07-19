<template>
  <div
    class="alert"
    role="alert"
    :class="alertClasses"
  >
    <BaseIcon
      class="alert__icon"
      icon="error-circle"
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

<script>
const validTypes = {
  success: 'success',
  error: 'error',
};
</script>

<script setup>
import { computed } from 'vue';

defineEmits(['close']);
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: validTypes.success,
    validator:(type) => Object.values(validTypes).includes(type),
  },
});

const alertClasses = computed(() => ({
  'alert--success': props.type === validTypes.success,
  'alert--error': props.type === validTypes.error,
}));
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

  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding: 0.75rem 0;
  padding-left: 0.625rem;
  padding-right: 1rem;
  background-color: var(--background-color);
  border-radius: 0.5rem;
  border-left: 0.375rem solid var(--border-color);
  position: relative;
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    fill: var(--icon-color);
  }
  &__content {
    margin-right: 1.5rem;
    * {
      color: $color--text-darken;
    }
  }
  &__close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 0.5rem;
  }
  &__close-button-icon {
    width: 1rem;
    height: 1rem;
    fill: var(--icon-color);
  }
}
</style>
