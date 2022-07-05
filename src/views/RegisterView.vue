<template>
  <AuthHeading>Crie sua conta</AuthHeading>
  <AuthForm>
    <TextField
      id="register--field-name"
      label="Nome de usuário"
    />
    <TextField
      id="register--field-email"
      type="email"
      label="Email"
    />
    <TextField
      id="register--field-password"
      label="Senha"
    />
    <TextField
      id="register--field-confirm-password"
      label="Repita a senha"
    />
    <template #footer>
      <BaseButton>Criar conta</BaseButton>
    </template>
  </AuthForm>
  <span class="login text-darken">
    Já possui uma conta?
    <router-link
      class="login__link"
      :to="{ name: 'login' }"
    >
      Faça login
    </router-link>
  </span>
</template>

<script setup>
import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';
</script>

<style lang="scss" scoped>
.login {
  display: block;
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  &__link {
    color: $color--secondary;
    @include focus-ring;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
