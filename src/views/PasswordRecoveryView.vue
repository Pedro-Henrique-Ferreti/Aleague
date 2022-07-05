<template>
  <AuthHeading>Recupere sua senha</AuthHeading>
  <p class="text-darken">
    Para recuperar sua senha, digite o endereço de email que você utiliza para acessar sua conta.
  </p>
  <AuthForm class="password-recovery__form">
    <TextField
      id="password-recovery--field-email"
      type="email"
      label="Email"
    />
    <template #footer>
      <BaseButton>Recuperar senha</BaseButton>
      <BaseButton
        color="gray"
        :to="{ name: 'login' }"
      >
        Voltar
      </BaseButton>
    </template>
  </AuthForm>
</template>

<script setup>
import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';
</script>

<style lang="scss" scoped>
.password-recovery__form {
  margin-top: 2rem;
}
</style>
