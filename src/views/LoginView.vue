<template>
  <AuthHeading>Acesse sua conta</AuthHeading>
  <AuthForm>
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
