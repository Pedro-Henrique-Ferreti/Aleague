<template>
  <main>
    <h1 class="h2 text-center">
      Verificação de email
    </h1>
    <p class="form__description">
      Nós enviamos um código de verificação para o seu email:
      <br />
      {{ displayedEmail }}
    </p>
    <form
      class="form"
      @submit.prevent="submitForm"
    >
      <AppOtpInput v-model="verificationCode" />
      <AppToast
        v-if="errorMessage"
        class="form__toast"
        :type="TYPE.ERROR"
        :message="errorMessage"
      />
      <div class="form__footer">
        <AppTextButton
          :is-loading="isResendingEmail"
          @click="resendEmail"
        >
          Reenviar código
        </AppTextButton>
        <AppButton
          class="form__button"
          type="submit"
          :is-loading="isLoading"
          :disabled="verificationCode.length !== 6"
        >
          Verificar email
        </AppButton>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import type { ApiError } from '@/types/Auth';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TYPE } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/toast';
import api from '@/api';
import AppButton from '@/components/AppButton.vue';
import AppTextButton from '@/components/AppTextButton.vue';
import AppToast from '@/components/AppToast.vue';
import AppOtpInput from '@/components/AppOtpInput.vue';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Displayed email address
const displayedEmail = computed(() => {
  if (!authStore.user) return '';

  const [first, last] = authStore.user.email.split('@');

  return `${first.substring(0, 3).padEnd(3, '*')}****@${last}`;
});

// Form
const verificationCode = ref('');

const isLoading = ref(false);
const errorMessage = ref('');

async function submitForm() {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    await api.authService.verifyEmailAddress(verificationCode.value);

    router.push({ name: 'teams' });
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

<style lang="scss" scoped>
.form {
  &__description {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  &__button {
    width: 100%;
  }
  &__toast {
    margin-top: 2rem;
  }
  &__footer {
    display: grid;
    place-items: center;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }
}
</style>
