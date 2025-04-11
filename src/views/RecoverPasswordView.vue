<template>
  <TransitionSlide direction="left">
    <AuthCard
      v-if="emailSent"
      show-success-icon
    >
      <template #title>
        Recuperar senha
      </template>
      <template #description>
        Um e-mail foi enviado com instruções para recuperar sua senha.
        Verfique sua caixa de entrada.
      </template>
      <template #form-footer>
        <AppTextButton @click="$router.back()">
          Voltar ao login
        </AppTextButton>
      </template>
    </AuthCard>
    <AuthCard
      v-else
      :error-message="errorMessage"
      @submit-form="submitForm"
    >
      <template #title>
        Recuperar senha
      </template>
      <template #description>
        Preencha o email para recuperar a senha
      </template>
      <template #form-fields>
        <AppInput
          v-model.lazy="form.email"
          label="Email"
          :dirty="v$.email.$dirty"
          :error-message="v$.email.$errors[0]?.$message"
        />
      </template>
      <template #form-footer>
        <AppButton
          block
          type="submit"
          :is-loading="isLoading"
        >
          Recuperar senha
        </AppButton>
        <AppTextButton @click="$router.back()">
          Voltar
        </AppTextButton>
      </template>
    </AuthCard>
  </TransitionSlide>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import api from '@/api';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AuthCard from '@/components/AuthCard.vue';
import TransitionSlide from '@/components/TransitionSlide.vue';

const form = ref({
  email: '',
});

// Validation rules
const v$ = useVuelidate({
  email: {
    required: requiredValidator,
    email: emailValidator,
  },
}, form, { $autoDirty: true });

// Submit form
const isLoading = ref(false);
const emailSent = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';

  if (!await v$.value.$validate()) return;

  isLoading.value = true;

  try {
    await api.authService.sendResetPasswordEmail(form.value.email);

    emailSent.value = true;
  } catch (error: any) {
    errorMessage.value = (error.response)
      ? (error.response as ApiError).data.message
      : 'Ocorreu um erro inesperado. Por favor, tente novamente.';
  } finally {
    isLoading.value = false;
  }
}
</script>
