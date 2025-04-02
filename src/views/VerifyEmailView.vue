<template>
  <AuthCard
    :error-message="errorMessage"
    @submit-form="submitForm"
  >
    <template #title>
      Verificação de email
    </template>
    <template #description>
      Nós enviamos um código de verificação para o seu email:
      <br />
      {{ displayedEmail }}
    </template>
    <template #form-fields>
      <AppOtpInput v-model="verificationCode" />
    </template>
    <template #form-footer>
      <AppTextButton
        :is-loading="isResendingEmail"
        @click="resendEmail"
      >
        Reenviar código
      </AppTextButton>
      <AppButton
        block
        type="submit"
        :is-loading="isLoading"
        :disabled="verificationCode.length !== 6"
      >
        Verificar email
      </AppButton>
    </template>
  </AuthCard>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/toast';
import api from '@/api';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppOtpInput from '@/components/AppOtpInput.vue';
import AuthCard from '@/components/AuthCard.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Displayed email address
const displayedEmail = computed(() => {
  if (!authStore.user) return '';

  const [first, last] = authStore.user.email.split('@');

  return `${first.substring(0, 3)}****@${last}`;
});

// Form
const verificationCode = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const { data: user } = await api.authService.verifyEmailAddress(verificationCode.value);

    authStore.setSessionCookie({
      accessToken: authStore.accessToken as string,
      user,
    });

    router.push({ name: 'tournaments' });
  } catch (error: any) {
    errorMessage.value = (error.response)
      ? (error.response as ApiError).data.message
      : 'Ocorreu um erro inesperado. Por favor, tente novamente.';
  } finally {
    isLoading.value = false;
  }
}

// Resend verification email
const isResendingEmail = ref(false);

async function resendEmail() {
  errorMessage.value = '';
  isResendingEmail.value = true;

  try {
    await api.authService.resendVerificationEmail();

    verificationCode.value = '';

    toast.success({
      message: 'O código de verificação foi reenviado. Por favor, verifique sua caixa de entrada.',
      timeout: 6000,
    });
  } catch (error: any) {
    errorMessage.value = 'Não foi possível reenviar o código. Por favor, tente novamente.';
  } finally {
    isResendingEmail.value = false;
  }
}
</script>
