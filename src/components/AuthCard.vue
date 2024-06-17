<template>
  <main class="auth-card | app-base-card">
    <header class="auth-card__header">
      <RouterLink
        aria-label="Go to the Home page"
        :to="{ name: 'landing-page' }"
      >
        <AppLogo class="auth-card__logo" />
      </RouterLink>
    </header>
    <h1 class="h2 text-center">
      <slot name="title" />
    </h1>
    <p class="auth-card__description">
      <slot name="description" />
    </p>
    <form
      class="auth-card__form"
      @submit.prevent="$emit('submit-form', $event)"
    >
      <div class="auth-card__form-fields">
        <slot name="form-fields" />
      </div>
      <AppToast
        v-if="errorMessage"
        class="auth-card__toast"
        :type="TYPE.ERROR"
        :message="errorMessage"
      />
      <div class="auth-card__form-footer">
        <slot name="form-footer" />
      </div>
    </form>
    <slot name="footer" />
  </main>
</template>

<script lang="ts" setup>
import { TYPE } from 'vue-toastification';
import AppLogo from '@/components/AppLogo.vue';
import AppToast from '@/components/AppToast.vue';

defineEmits(['submit-form']);
defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.auth-card {
  --base-card--padding: 2.5rem;
  width: 100%;
  max-width: 25rem;
  height: fit-content;
  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  &__description {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  &__form-fields {
    display: grid;
    gap: 1rem;
  }
  &__form-footer {
    display: grid;
    place-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  &__toast {
    margin-top: 2rem;
  }
}
</style>
