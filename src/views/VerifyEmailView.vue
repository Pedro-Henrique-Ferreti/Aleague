<template>
  <AuthHeading :subtitle="userStore.user?.email">
    Verifique seu email
  </AuthHeading>
  <AuthForm
    :error-message="errorMessage"
    @close-alert="errorMessage = ''"
  >
    <p
      v-if="$route.query.from === 'register'"
      class="text-darken"
    >
      Obrigado por se cadastrar! Antes de começar, digite o código de seis dígitos recebido no e-mail informado.
    </p>
    <p
      v-else
      class="text-darken"
    >
      Bem-vindo de volta! Antes de começar, digite o código de seis dígitos recebido no e-mail informado.
    </p>
    <EnterCode
      :is-loading="isSendingCode"
      @update-code="verificationCode = $event"
      @resend-code="resendCode"
    />
    <template #footer>
      <AppButton
        :is-loading="isLoading"
        :disabled="verificationCode.length < 6"
        @click="verifyEmailAddress"
      >
        Continuar
      </AppButton>
    </template>
  </AuthForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';
import EnterCode from '@/components/EnterCode.vue';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const errorMessage = ref('');
const verificationCode = ref('');
const isLoading = ref(false);
const isSendingCode = ref(false);

async function resendCode() {
  isSendingCode.value = true;

  try {
    await authStore.sendEmailVerificationCode();
  } catch (error) {
    errorMessage.value = 'Falha ao enviar o código de verificação. Por favor, tente novamente.';
  } finally {
    isSendingCode.value = false;
  }
}

async function verifyEmailAddress() {
  isLoading.value = true;

  try {
    await authStore.verifyEmailAddress(verificationCode.value);

    router.push({ name: 'home' });
  } catch (error: Error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>
