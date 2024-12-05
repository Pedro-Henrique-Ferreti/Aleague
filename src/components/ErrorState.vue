<template>
  <div class="error-state">
    <ErrorState />
    <span class="error-state__title | h2">
      Ah não!
    </span>
    <p class="error-state__text">
      <slot>{{ message }}</slot>
    </p>
    <div class="error-state__controls">
      <slot name="controls">
        <AppButton
          color="secondary"
          :icon-left="IconRestart"
          @click="$emit('reload')"
        >
          Recarregar
        </AppButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconRestart from '@/assets/icons/Restart.svg';
import ErrorState from '@/assets/icons/ErrorState.svg';
import AppButton from './AppButton.vue';

defineEmits(['reload']);
defineProps({
  message: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.error-state {
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  &__title {
    display: block;
    margin-top: 1rem;
  }
  &__text {
    max-width: 20rem;
    margin-top: 0.5rem;
  }
  &__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
}
</style>
