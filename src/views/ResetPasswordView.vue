<template>
  <TransitionSlide direction="left">
    <p v-if="isValidatingToken">
      Loading...
    </p>
    <AuthCard v-else-if="tokenIsExpired">
      <template #title>
        Link expirado
      </template>
      <template #description>
        Este link para recuperar a senha expirou. Por favor, solicite um novo link
      </template>
      <template #form-footer>
        <AppButton
          block
          :to="{ name: 'recover-password' }"
        >
          Solicitar novo link
        </AppButton>
        <AppTextButton :to="{ name: 'login' }">
          Voltar ao login
        </AppTextButton>
      </template>
    </AuthCard>
    <AuthCard
      v-else-if="passwordReset"
      show-success-icon
    >
      <template #title>
        Redefinir senha
      </template>
      <template #description>
        Sua senha foi alterada com sucesso!
      </template>
      <template #form-footer>
        <AppButton
          block
          :to="{ name: 'login' }"
        >
          Acessar conta
        </AppButton>
      </template>
    </AuthCard>
    <AuthCard
      v-else
      :error-message="errorMessage"
      @submit-form="submitForm"
    >
      <template #title>
        Redefinir senha
      </template>
      <template #description>
        Por favor, digite uma nova senha para {{ displayedEmail }}
      </template>
      <template #form-fields>
        <AppInput
          v-model.lazy="form.password"
          id="register--password"
          label="Senha"
          type="password"
          :dirty="v$.password.$dirty"
          :error-message="v$.password.$errors[0]?.$message"
        />
        <AppInput
          v-model.lazy="form.passwordConfirmation"
          id="register--password-confirmation"
          type="password"
          label="Repitir senha"
          :dirty="v$.passwordConfirmation.$dirty"
          :error-message="v$.passwordConfirmation.$errors[0]?.$message"
        />
      </template>
      <template #form-footer>
        <AppButton
          block
          type="submit"
          :is-loading="isLoading"
        >
          Redefinir senha
        </AppButton>
      </template>
    </AuthCard>
  </TransitionSlide>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength } from '@vuelidate/validators';
import { requiredValidator } from '@/helpers/validators';
import api from '@/api';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AuthCard from '@/components/AuthCard.vue';
import TransitionSlide from '@/components/TransitionSlide.vue';

const route = useRoute();

// Displayed email address
const displayedEmail = computed(() => {
  if (!route.query.email || typeof route.query.email !== 'string') return '';

  const [first, last] = route.query.email.split('@');

  return `${first.substring(0, 3)}****@${last}`;
});

// Form
const form = ref({
  password: '',
  passwordConfirmation: '',
});

// Validation rules
const sameAsPassword = (value: string) => value === form.value.password;

const v$ = useVuelidate({
  password: {
    required: requiredValidator,
    minLength: helpers.withMessage(
      'A senha deve ter ao menos 8 caracteres.',
      minLength(8),
    ),
  },
  passwordConfirmation: {
    required: requiredValidator,
    sameAsRef: helpers.withMessage(
      'As senhas informadas devem ser iguais.',
      sameAsPassword,
    ),
  },
}, form, { $autoDirty: true });

// Token validation
const isValidatingToken = ref(true);
const tokenIsExpired = ref(false);

async function validateToken() {
  const { token, email } = route.query;

  try {
    if (!token || !email) throw new Error();

    const { data: { isValid } } = await api.authService.validateResetPasswordToken({
      token: token as string,
      email: email as string,
    });

    if (!isValid) throw new Error();
  } catch (error) {
    tokenIsExpired.value = true;
  } finally {
    isValidatingToken.value = false;
  }
}

validateToken();

// Submit form
const isLoading = ref(false);
const passwordReset = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';

  if (!await v$.value.$validate()) return;

  isLoading.value = true;

  try {
    await api.authService.resetPassword({
      token: route.query.token as string,
      email: route.query.email as string,
      password: form.value.password,
      passwordConfirmation: form.value.passwordConfirmation,
    });

    passwordReset.value = true;
  } catch (error: any) {
    errorMessage.value = 'Ocorreu um erro inesperado. Por favor, tente novamente.';
  } finally {
    isLoading.value = false;
  }
}
</script>
