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
    <template #footer>
      <BaseButton>
        Fazer login
      </BaseButton>
      <BaseButton color="gray">
        Recuperar senha
      </BaseButton>
    </template>
  </AuthForm>
  <span class="register">
    Não tem uma conta?
    <router-link
      class="register__link"
      :to="{ name: 'register' }"
    >
      Cadastre-se
    </router-link>
  </span>
</template>

<script setup>
import { ref } from 'vue';
import TextField from '@/components/common/TextField.vue';
import AuthHeading from '@/components/AuthHeading.vue';
import AuthForm from '@/components/AuthForm.vue';

const email = ref('');
</script>

<style lang="scss" scoped>
.register {
  display: block;
  width: 100%;
  margin-top: 5rem;
  color: $color--text-darken;
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
