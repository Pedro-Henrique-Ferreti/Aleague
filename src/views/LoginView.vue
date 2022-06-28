<template>
  <AuthHeading>Acesse sua conta</AuthHeading>
  <AuthForm>
    <TextField
      id="login--field-email"
      label="Email"
      v-model="email"
    />
    <TextField
      id="login--field-password"
      type="password"
      label="Senha"
      v-model="email"
    />
    <pre>{{ email }}</pre>
    <template #footer>
      <BaseButton>
        Fazer login
      </BaseButton>
      <BaseButton color="gray">
        Recuperar senha
      </BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import { ref } from 'vue';
import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const email = ref('');
</script>
