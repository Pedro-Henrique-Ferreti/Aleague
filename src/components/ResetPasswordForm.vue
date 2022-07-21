<template>
  <AuthHeading :subtitle="$route.query.email">
    Redefina sua senha
  </AuthHeading>
  <p class="text-darken">
    Por favor, digite a sua nova senha.
  </p>
  <AuthForm
    class="reset-password-form"
  >
    <TextField
      id="reset-password--field-new-password"
      type="password"
      label="Nova senha"
      v-model.lazy="password"
    />
    <TextField
      id="reset-password--field-password-confirmation"
      type="password"
      label="Repita a nova senha"
      v-model.lazy="passwordConfirmation"
    />
    <template #footer>
      <BaseButton
        type="submit"
      >
        Redefinir senha
      </BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import { ref } from 'vue';
import TextField from './common/TextField.vue';
import AuthForm from './AuthForm.vue';
import AuthHeading from './AuthHeading.vue';

const password = ref('');
const passwordConfirmation = ref('');
</script>

<style lang="scss" scoped>
.reset-password-form {
  margin-top: 1.5rem;
}
</style>
