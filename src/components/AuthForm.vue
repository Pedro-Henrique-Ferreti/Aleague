<template>
  <form
    class="auth-form"
    @submit.prevent="$emit('submit')"
  >
    <AppAlert
      v-show="errorMessage"
      class="auth-form__alert"
      type="error"
      :message="errorMessage"
      @close="$emit('close-alert')"
    />
    <div class="auth-form__fields">
      <slot />
    </div>
    <div class="auth-form__footer">
      <slot name="footer" />
    </div>
  </form>
</template>

<script lang="ts" setup>
defineEmits(['submit', 'close-alert']);
defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.auth-form {
  &__alert {
    margin-bottom: 1.5rem;
  }
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
