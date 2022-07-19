<template>
  <AuthHeading>Verifique seu email</AuthHeading>
  <span class="email-address">
    {{ authStore.user.email }}
  </span>
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
      @resend-code="resendCode"
    />
    <template #footer>
      <BaseButton>Continuar</BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';
import EnterCode from '@/components/EnterCode.vue';

const authStore = useAuthStore();

const isSendingCode = ref(false);
const errorMessage = ref('');

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
</script>

<style lang="scss" scoped>
.email-address {
  display: flex;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
}
</style>
