<template>
  <AuthHeading>Acesse sua conta</AuthHeading>
  <AuthForm>
    <BaseInput
      id="login--input-email"
      label="Email"
    />
    <template v-slot:footer>
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
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';
</script>
