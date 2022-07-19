<template>
  <AuthHeading>Verifique seu email</AuthHeading>
  <span class="email-address">
    {{ authStore.user.email }}
  </span>
  <AuthForm>
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
    <template #footer>
      <BaseButton>Continuar</BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.email-address {
  display: flex;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
}
</style>
