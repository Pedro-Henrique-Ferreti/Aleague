<template>
  <AuthHeading :subtitle="$route.query.email">
    Redefina sua senha
  </AuthHeading>
  <p class="text-darken">
    Por favor, digite a sua nova senha.
  </p>
  <AuthForm
    class="reset-password-form"
    @submit="submitForm"
  >
    <TextField
      v-model.lazy="password"
      id="reset-password--field-new-password"
      type="password"
      label="Nova senha"
      :dirty="v$.password.$dirty"
      :error-message="v$.password.$errors[0]?.$message"
    />
    <TextField
      v-model.lazy="passwordConfirmation"
      id="reset-password--field-password-confirmation"
      type="password"
      label="Repita a nova senha"
      :dirty="v$.passwordConfirmation.$dirty"
      :error-message="v$.passwordConfirmation.$errors[0]?.$message"
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
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers, sameAs, minLength } from '@vuelidate/validators';
import { required } from '@/helpers/i18nValidators';
import TextField from './common/TextField.vue';
import AuthForm from './AuthForm.vue';
import AuthHeading from './AuthHeading.vue';

const minLenghtValidator = helpers.withMessage(
  'Sua nova senha deve ter ao menos 8 caracteres.',
  minLength(8),
);

const password = ref('');
const passwordConfirmation = ref('');

const rules = computed(() => ({
  password: {
    required,
    minLength: minLenghtValidator,
  },
  passwordConfirmation: {
    required,
    minLength: minLenghtValidator,
    sameAsRef: helpers.withMessage('As senhas informadas não são iguais.', sameAs(password)),
  },
}));

const v$ = useVuelidate(rules, {
  password,
  passwordConfirmation,
}, { $autoDirty: true });

async function submitForm() {
  const formIsValid = await v$.value.$validate();

  if (!formIsValid) {
    return;
  }
}
</script>

<style lang="scss" scoped>
.reset-password-form {
  margin-top: 1.5rem;
}
</style>
