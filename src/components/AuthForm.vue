<template>
  <form
    class="auth-form"
    @submit.prevent="$emit('submit')"
  >
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <div class="auth-form__fields">
      <slot />
    </div>
    <div class="auth-form__footer">
      <slot name="footer" />
    </div>
  </form>
</template>

<script setup>
defineEmits(['submit']);
defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.auth-form {
  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
